import { useState, useEffect } from "react";

import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useAuthMeQuery, useUpdateProfileMutation } from "../redux/feature/authManage/authApi";
import { clearCart } from "../redux/feature/cart/cartSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAddOrderMutation } from "../redux/feature/orderManage/orderApi";
import Loading from "./Loading";




const OrderPage = () => {

  const { isLoading, data } = useAuthMeQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [
    createOrder,
    { isLoading: orderLoading, isSuccess, data: orderData, isError, error },
  ] =  useAddOrderMutation();

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

      // Check if any required fields are missing
      if (!data.data.name || !data.data.phone || !data.data.address) {
        setProfileComplete(false);
      } else {
        setProfileComplete(true);
      }
    }
  }, [data]);
  const toastId = "order";
  useEffect(() => {
    if (orderLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      // toast.success(orderData?.message, { id: toastId });
      dispatch(clearCart())
      if (orderData?.data) {
        // dispatch(afterOrder())
        setTimeout(() => {
          window.location.href = orderData?.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [dispatch, error, isError, isSuccess, orderData, orderData?.message, orderLoading]);
 
  const handleOrderCreate = async () => {
    interface FormattedData {
      products: {
        _id: string;
        quantity: number;
      }[];
    }

    const formattedData: FormattedData = {
      products: cartData?.items?.map((item: { _id: string; selectQuantity: number }) => ({
        _id: item?._id,
        quantity: item?.selectQuantity,
      })),
    };

    await createOrder(formattedData).unwrap();
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({
        name: userDetails.name,
        phone: userDetails.phone,
        address: userDetails.address,
      }).unwrap();
      setIsEditing(false);
      setProfileComplete(true);
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  // console.log(cartData, "data");

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Details - Left Side (8 Rows) */}
        <div className="md:col-span-2 row-span-8">
          <Card className="shadow-md h-full">
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={userDetails.name}
                  disabled={!isEditing}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                />
                <Input placeholder="Email" value={userDetails.email} disabled />
                <Input
                  placeholder="Phone"
                  value={userDetails.phone}
                  disabled={!isEditing}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserDetails({ ...userDetails, phone: e.target.value })
                  }
                />
                <Input
                  placeholder="Address"
                  value={userDetails.address}
                  disabled={!isEditing}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserDetails({ ...userDetails, address: e.target.value })
                  }
                />
              </div>
              {!profileComplete && (
                <p className="text-red-500 mt-2">
                  Please update your profile to proceed with the order.
                </p>
              )}
              {isEditing ? (
                <Button
                  className="w-full mt-4 bg-green-500 text-white"
                  onClick={handleProfileUpdate}
                >
                  Save Profile
                </Button>
              ) : (
                !profileComplete && (
                  <Button
                    className="w-full mt-4 bg-black hover:bg-red-500 duration-300 text-white"
                    onClick={() => setIsEditing(true)}
                  >
                    Update Profile
                  </Button>
                )
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary - Right Side (4 Rows) */}
        <div className="md:col-span-1 row-span-4">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-lg">
              <span>Total Products:</span>
              <span className="font-semibold">{cartData?.totalQuantity}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Price:</span>
              <span className="text-2xl text-red-600">
                Tk.{cartData?.totalPrice}
              </span>
            </div>
            {profileComplete && cartData?.items.length > 0 && (
              <Button
                className="w-full text-white bg-primary-red mt-4"
                onClick={handleOrderCreate}
              >
                Order
              </Button>
            )}
          </div>
           <div className="w-full text-center mt-3">
            <h4 className="text-center w-full text-red-800 text-lg font-bold">!!Warning!!</h4>
            <p>!! Warning !!</p>
            <p>Product quantity will be reduced after admin verifies the order</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
