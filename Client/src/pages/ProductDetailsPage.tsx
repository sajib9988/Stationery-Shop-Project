import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import Loading from "./Loading";
import { addToCart } from "../redux/feature/cart/cartSlice";
import { useGetProductByIdQuery } from "../redux/feature/productManage/productApi";
import { BiCart } from "react-icons/bi";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
const ProductDetailsPage = () => {

    const { id } = useParams();
  const {data,isLoading}=useGetProductByIdQuery(id)
  const navigate=useNavigate()
  const dispatch=useAppDispatch()
  const product = data?.data;
// console.log(data?.data,"checking product")
 const handleOrder=()=>{
  dispatch(addToCart({...product,selectQuantity:1}))
  navigate('/cart')
 }
if(isLoading){
  return <Loading/>
}
  if (!product) {
    return <div className="text-center text-red-600 text-xl mt-10">Product not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Image */}
          <div className="relative shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-[300px] md:h-[450px] object-cover" />
            <Badge>
              className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold ${
                product?.inStock ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            
              { product?.inStock?'In Stock': 'Out of Stock' }
            </Badge>
          </div>

          {/* Right Side - Details */}
          <div className="p-6 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-500 py-2 text-sm md:text-base mb-2">{product.category} Bike | Model: {product.model}</p>
            <Button className="flex w-[120px] text-xl bg-green-500 hover:bg-green-500 cursor-default">Quantity: <span className="text-xl">{product?.quantity || 0}</span> </Button>
            <p className="text-lg font-medium text-gray-600 mt-2">
              <span className="font-semibold">Brand:</span> {product?.brand}
            </p>
            <p className="text-lg font-medium text-gray-600">
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-primary-red font-bold text-xl">{product.price} tk</span>
            </p>
  
            <p className="mt-4 text-gray-700">{product.description}</p>

            {/* Buttons */}
            {
              product?.inStock &&  <div className="mt-6 flex flex-col sm:flex-row gap-4">
              {/* Add to Cart Button */}
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-semibold bg-primary-red hover:bg-red-700 transition-all`}
                // disabled={product.inStock}
                onClick={()=> dispatch(addToCart({...product,selectQuantity:1}))}
              >
                <BiCart className="text-xl hover:scale-[1.05]" /> Add to Cart
              </button>

              {/* Go Back Button */}

                <button onClick={handleOrder} className="px-4 py-2 border bg-gray-900 text-white  rounded-md font-semibold hover:scale-[1.05] hover:text-white duration-300 transition">
                  Order
                </button>

            </div>
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;