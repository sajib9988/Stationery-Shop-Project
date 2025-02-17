import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useState } from "react";
import { Label } from "../components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useAuthMeQuery, useUpdateProfileMutation } from "@/redux/features/auth/authApi";

import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { FiCreditCard, FiTruck } from 'react-icons/fi';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useAddOrderMutation } from "../redux/feature/orderManage/orderApi";
import Loading from "./Loading";

const CheckoutPage = () => {
  const { isLoading, data } = useAuthMeQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [createOrder] = useAddOrderMutation();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: ""
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
        city: "",
        state: "",
        zip: "",
      });

      const requiredFields = [data.data.name, data.data.phone, data.data.address];
      setProfileComplete(requiredFields.every(field => !!field));
    }
  }, [data]);

  const handleOrderCreate = async () => {
    const orderPayload = {
      products: cartData?.items?.map((item) => ({
        _id: item?._id,
        quantity: item?.selectQuantity,
      })),
      shippingInfo: {
        address: userDetails.address,
        city: userDetails.city,
        state: userDetails.state,
        zip: userDetails.zip
      },
      paymentInfo: {
        cardNumber: paymentDetails.cardNumber,
        expiration: `${paymentDetails.expirationMonth}/${paymentDetails.expirationYear}`,
        cvv: paymentDetails.cvv
      }
    };

    await createOrder(orderPayload).unwrap();
  };

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

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Column - User and Shipping Info */}
        <div className="space-y-6">
          {/* User Details Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiTruck className="w-5 h-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <Input
                  placeholder="Full Name"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                />
                <Input
                  placeholder="Phone"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                />
                <Input
                  placeholder="Address"
                  value={userDetails.address}
                  onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={userDetails.city}
                    onChange={(e) => setUserDetails({...userDetails, city: e.target.value})}
                  />
                  <Select
                    value={userDetails.state}
                    onValueChange={(value: string) => setUserDetails({...userDetails, state: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="ZIP Code"
                  value={userDetails.zip}
                  onChange={(e) => setUserDetails({...userDetails, zip: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Details Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiCreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={paymentDetails.expirationMonth}
                  onValueChange={(value: string) => setPaymentDetails({...paymentDetails, expirationMonth: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 12}, (_, i) => (
                      <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>
                        {String(i+1).padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={paymentDetails.expirationYear}
                  onValueChange={(value: string) => setPaymentDetails({...paymentDetails, expirationYear: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 6}, (_, i) => (
                      <SelectItem key={i} value={String(2023 + i)}>
                        {2023 + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartData?.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.selectQuantity}
                      </p>
                    </div>
                    <span className="font-medium">Tk.{item.price * item.selectQuantity}</span>
                  </div>
                ))}

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Tk.{cartData.totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Tk.100</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>Tk.{cartData.totalPrice + 100}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-primary-red text-white"
                  onClick={handleOrderCreate}
                  disabled={!profileComplete || cartData.items.length === 0}
                >
                  Place Order
                </Button>

                {!profileComplete && (
                  <p className="text-red-500 mt-2 text-sm">
                    Please complete all required fields to place order
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="bg-red-100 p-4 rounded-lg">
            <h4 className="text-red-800 font-bold text-center mb-2">!! Warning !!</h4>
            <p className="text-red-600 text-sm text-center">
              এডমিন order ভেরিফাই করার পর প্রডাক্ট কোয়ান্টিটি কমবে
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;