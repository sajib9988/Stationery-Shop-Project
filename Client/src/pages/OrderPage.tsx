import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuthMeQuery, useUpdateProfileMutation } from "../redux/feature/authManage/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { clearCart } from "../redux/feature/cart/cartSlice";
import Loading from "./Loading";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useCreateOrderMutation } from "../redux/feature/orderManage/orderApi";

 

const OrderPage = () => {
  const { isLoading, data } = useAuthMeQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading: orderLoading, isSuccess, data: orderData, isError, error }] = useCreateOrderMutation();
 
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileComplete, setProfileComplete] = useState(true);

  useEffect(() => {
    if (data?.data) {
      setUserDetails({
        name: data.data.name || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        address: data.data.address || "",
      });
      setProfileComplete(!!(data.data.name && data.data.phone && data.data.address));
    }
  }, [data]);

  const toastId = "order";
  useEffect(() => {
    if (orderLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      dispatch(clearCart());
      if (orderData?.data) {
        setTimeout(() => {
          window.location.href = orderData?.data;
        }, 1000);
      }
    }

    if (isError)
      
       {toast.error(JSON.stringify(error), { id: toastId })
        console.error("Order create failed", error)
      };
  }, [error, isError, isSuccess, orderData, orderLoading]);


  const handleOrderCreate = async () => {
    const formattedData = {
      products: cartData?.items?.map((item) => ({
        _id: item?._id,
        quantity: item?.selectQuantity,
      })),
    };

    await createOrder(formattedData);
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
      }).unwrap();
      setIsEditing(false);
      setProfileComplete(true);
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  return (
    <div className="container mx-auto  mt-10 p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 row-span-8">
          <Card className="shadow-md h-full mt-3">
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Full Name" value={userDetails.name} disabled={!isEditing} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} />
                <Input placeholder="Email" value={userDetails.email} disabled />
                <Input placeholder="Phone" value={userDetails.phone} disabled={!isEditing} onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })} />
                <Input placeholder="Address" value={userDetails.address} disabled={!isEditing} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })} />
              </div>
              {!profileComplete && <p className="text-red-500 mt-2">Please update your profile to proceed with the order.</p>}
              {isEditing ? (
                <Button className="w-full mt-4 bg-green-500 text-white" onClick={handleProfileUpdate}>Save Profile</Button>
              ) : (
                !profileComplete && <Button className="w-full mt-4 bg-black hover:bg-red-500 duration-300 text-white" onClick={() => setIsEditing(true)}>Update Profile</Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 row-span-4">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-lg">
              <span>Total Products:</span>
              <span className="font-semibold">{cartData?.totalQuantity}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Price:</span>
              <span className="text-2xl text-red-600">Tk.{cartData?.totalPrice}</span>
            </div>
            {profileComplete && cartData?.items.length > 0 && (
              <Button className="w-full text-center font-bold text-white bg-green-700 hover:bg-green-300 mt-4" onClick={handleOrderCreate}>Order</Button>
            )}
          </div>
          <div className="w-full text-center mt-3">
            <h4 className="text-center w-full text-red-800 text-lg font-bold">!!Warning!!</h4>
            <p>
            Product quantity will decrease after admin order verification After admin order verification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
