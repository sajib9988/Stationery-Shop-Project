/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useAuthMeQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "../redux/feature/authManage/authApi";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardTitle, CardHeader, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../components/ui/dialog";

const uploadImageToCloudinary = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "stationery shop");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dyqm6ffjt/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    // console.log("Cloudinary upload result:", result);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
};

const ProfileUpdate = () => {
  const { isLoading, data: user } = useAuthMeQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Profile state includes all fields from the database.
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    profileImage: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // States for controlling modals.
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.data?.name || "",
        email: user?.data?.email || "",
        phone: user?.data?.phone || "",
        address: user?.data?.address || "",
        zipCode: user?.data?.zipCode || "",
        profileImage: user?.data?.profileImage || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async () => {
    if (
      !profile.name.trim() ||
      !profile.phone.trim() ||
      !profile.address.trim() ||
      !profile.zipCode.trim()
    ) {
      return toast.error("Fields cannot be empty!");
    }
  
    const toastId = toast.loading("Updating profile...");
    let imageUrl = profile.profileImage;
  
    if (image) {
      try {
        imageUrl = await uploadImageToCloudinary(image);
      } catch (error) {
        toast.error("Failed to upload image");
        return;
      }
    }

    const zipCodeNumber = parseInt(profile.zipCode, 10);
 
    const numericZipCode = isNaN(zipCodeNumber) ? "" : zipCodeNumber;
  
    // Email is not editable, so we separate it out.
    const { email, ...profileData } = profile;
  
    const res = await updateProfile({
      ...profileData,
      email: profile.email,
      zipCode: numericZipCode, 
      profileImage: imageUrl,
    });
  
    if (res?.data?.success) {
      toast.success("Profile updated successfully", { id: toastId });
      setIsProfileModalOpen(false);
    } else {
      toast.error("Failed to update profile", { id: toastId });
    }
  };
  

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      return toast.error("All fields are required!");
    }

    const toastId = toast.loading("Updating password...");

    const res = await updatePassword({
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    });

    if (res?.data?.success) {
      toast.success("Password updated successfully", { id: toastId });
      setIsPasswordModalOpen(false);
      setPasswords({ oldPassword: "", newPassword: "" });
    } else {
      toast.error(res?.data?.message || "Failed to update password", { id: toastId });
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-4xl h-auto mb-5 overflow-y-auto mx-auto p-6">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={imagePreview || profile.profileImage || "https://via.placeholder.com/150"}
            />
            <AvatarFallback>{profile.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Displaying only image, name, email, and phone as plain text */}
          <div className="space-y-2">
            <div>
              <strong>Name:</strong> {profile.name}
            </div>
            <div>
              <strong>Email:</strong> {profile.email}
            </div>
            <div>
              <strong>Phone:</strong> {profile.phone}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            {/* Edit Profile Modal */}
            <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent aria-describedby="edit-profile-description">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription id="edit-profile-description">
                    Update your profile information. (Email cannot be edited)
                  </DialogDescription>
                </DialogHeader>
                {/* Two-column layout for modal inputs */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full h-12 border-2 border-gray-300 rounded-lg px-3"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full h-12 border-2 border-gray-300 rounded-lg px-3"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Address</Label>
                    <Input
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="w-full h-12 border-2 border-gray-300 rounded-lg px-3"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Zip Code</Label>
                    <Input
                      name="zipCode"
                      value={profile.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter your zip code"
                      className="w-full h-12 border-2 border-gray-300 rounded-lg px-3"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Profile Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] && handleImageChange(e.target.files[0])
                      }
                      placeholder="Choose an image"
                      className="w-full h-12 border-2 border-gray-300 rounded-lg px-3"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={handleUpdateProfile}>
                    Save Changes
                  </Button>
                  <Button variant="destructive" onClick={() => setIsProfileModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Change Password Modal */}
            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Change Password</Button>
              </DialogTrigger>
              <DialogContent aria-describedby="change-password-description">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription id="change-password-description">
                    Please enter your current password and a new password.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Old Password</Label>
                    <Input
                      name="oldPassword"
                      type="password"
                      value={passwords.oldPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      className="w-full h-12 border-2 border-gray-300 rounded-lg px-3"
                    />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input
                      name="newPassword"
                      type="password"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className="w-full h-12 border-2 border-gray-300 rounded-lg px-3"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={handleChangePassword}>
                    Save Password
                  </Button>
                  <Button variant="destructive" onClick={() => setIsPasswordModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileUpdate;
