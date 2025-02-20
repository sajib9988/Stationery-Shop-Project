
import { RiDeleteBin2Fill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { removeFromCart, updateQuantity } from "../redux/feature/cart/cartSlice";
import { Button } from "../components/ui/button";

const Cart = () => {
  const cartData = useAppSelector((state) => state.cart);
  console.log(cartData); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <section className="container border-red-500 mx-auto min-h-[70vh] grid grid-cols-1 lg:grid-cols-12 gap-12 py-6 px-4 md:px-0">
      {/* Left Side: Product List */}
      <div className="lg:col-span-9 rounded-lg shadow-md p-6 border-red-500">
        <h2 className="text-xl font-bold mb-4">MY CART</h2>
        {cartData?.items.length > 0 ? (
          cartData?.items?.map((item) => (
            <div
              // product mean product id
              key={item?._id}
              className="flex md:flex-row flex-col items-center justify-between gap-4 border-b border-gray-200 py-4"
            >
              <img
                src={item?.image}
                alt="Product"
                className="w-32 object-cover border rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Model: {item?.model}</p>
              </div>
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-1 border-r text-gray-600"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item._id,
                        selectQuantity: Math.max(item.selectQuantity - 1, 1),
                      })
                    )
                  }
                >
                  -
                </button>
                <span className="px-4">{item?.selectQuantity}</span>
                <button
                  className="px-3 py-1 border-l text-gray-600"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item._id,
                        selectQuantity: Math.min(
                          item?.selectQuantity + 1,
                          item.quantity
                        ),
                      })
                    )
                  }
                >
                  +
                </button>
              </div>
              <div>
                <span className="font-semibold text-lg">
                  $ {item.price.toFixed(2)}
                </span>
              </div>
              <div>
                <Button
                  onClick={() => dispatch(removeFromCart(item?._id))}
                  variant="link"
                  className="text-primary-red flex items-center gap-2"
                >
                  <RiDeleteBin2Fill className="w-5 h-5 mr-1" /> Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full grid place-items-center text-semibold text-center text-xl">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        )}
      </div>

      {/* Right Side: Price Summary (Fixed Sidebar) */}
      <div className="lg:col-span-3 relative">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-xl">Total Product:</span>
            <span className="text-2xl">{cartData?.totalQuantity}</span>
          </div>
          {/* <div className="flex justify-between mb-2">
            <span>Tax (10%):</span>
            <span>${(totalPrice * 0.1).toFixed(2)}</span>
          </div> */}
          <div className="flex justify-between font-bold text-lg mb-4">
            <span className="text-xl">Total Price:</span>
            <span className="text-2xl">Tk.{cartData?.totalPrice}</span>
          </div>
          {cartData?.items.length > 0 && (
            <Button
              className="w-full text-white bg-primary-red"
              onClick={() => navigate("/order")}
            >
              Checkout
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
