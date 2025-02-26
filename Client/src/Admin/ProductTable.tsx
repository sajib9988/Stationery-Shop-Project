
import { useState } from "react";
import EditProductDetails from "./EditProductDetails";
import { FaTimes, FaCheck } from "react-icons/fa"; 
// import { toast } from "react-toastify";
import Loading from "../pages/Loading";
import {  useGetAllProductsQuery } from "../redux/feature/productManage/productApi";

export function ProductTable() {
  const { isLoading, data } = useGetAllProductsQuery(undefined);
  // const [deleteProduct] = useDeleteProductMutation(); 
  
  const [search, setSearch] = useState("");

  const filteredData = data?.data?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const dataLength = filteredData?.length;
  if (isLoading) return <Loading />;

  // প্রোডাক্ট ডিলিট হ্যান্ডলার
  // const handleDelete = async (id: string) => {
  //   try {
  //     await deleteProduct(id);
  //     toast.success("Product deleted successfully!");
  //   } catch (error) {
  //     toast.error("Failed to delete product.");
  //   }
  // };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-end pr-1">
        <input
          className="p-2 my-3 border-black border-2 text-black rounded-md"
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-50 uppercase bg-slate-700">
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Brand</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">In Stock</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        {dataLength as number > 0 && (
          <tbody>
            {filteredData?.map((item) => (
              <tr key={item._id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                <td className="px-6 py-4">
                  <img src={item.image} className="w-8 h-8 rounded-full" alt="product" />
                </td>
                <td className="px-6 py-4">{item?.name}</td>
                <td className="px-6 py-4">{item?.brand}</td>
                <td className="px-6 py-4">{item?.category}</td>
                <td className="px-6 py-4">${item?.price}</td>
                <td className="px-6 py-4">{item?.quantity}</td>
                <td className="px-6 py-4">
                  {item?.quantity === 0 ? (
                    <FaTimes className="w-4 text-red-500" />
                  ) : (
                    <FaCheck className="w-4 text-green-500" />
                  )}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <EditProductDetails product={item} /> {/* Update Button */}
                  {/* <button 
                    onClick={() => handleDelete(item._id)} 
                    className="text-red-600 hover:text-black"
                  >
                    <FaTrash />
                  </button> {/* Delete Button */}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {dataLength === 0 && (
        <div className="w-full h-[150px] grid place-items-center text-2xl">
          <p>Not Found any Product</p>
        </div>
      )}
    </div>
  );
}
