
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAppSelector } from "../redux/hook";
import { TUser, useCurrentToken } from "../redux/feature/authManage/authSlice";
import { verifyToken } from "../utils/verifyToken";

const OrderResponse = () => {
  const [searchParams] = useSearchParams();
  const invoice = searchParams.get("order_id");
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }


  return (
    <div className="flex items-center justify-center min-h-[75vh] p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 text-center max-w-md w-full">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4">
          Order Created!
        </h1>
        <p className="text-gray-600 mb-6">Your transaction ID is:</p>
        <div className="bg-gray-100 text-black py-3 px-6 rounded-lg font-mono text-lg shadow-inner mb-6">
          {invoice || "N/A"}
        </div>

       {user?.role === "admin" ? (
          <Link to="/admin/dashboard/viewOrders">
            <Button className="w-full  text-white font-semibold py-3 rounded-lg transition duration-300">
              View My Orders
            </Button>
          </Link>
        ) : (
          <Link to="/user/dashboard/viewOrders">
            <Button className="w-full  text-white font-semibold py-3 rounded-lg transition duration-300">
              View My Orders
            </Button>
          </Link>
        )} 
      </div>
    </div>
  );
};

export default OrderResponse;