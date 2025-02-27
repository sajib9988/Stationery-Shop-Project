// import Loading from "@/components/Loading";
import { Button } from "../components/ui/button";

import { useState } from "react";
import { toast } from "sonner";

import { useAllOrdersQuery, useVerifyOrderMutation } from "../redux/feature/orderManage/orderApi";
import { OrderProductDetails } from "../User/OrderProductDetails";
import Loading from "../pages/Loading";

const AdminOrder = () => {
  const { data, isLoading } = useAllOrdersQuery(undefined);
  // console.log("details", data)
  const [verifyOrder] = useVerifyOrderMutation();

  const [search, setSearch] = useState("");

  const filteredData = data?.data?.filter((item) =>
    item._id.toLowerCase().includes(search.toLowerCase())
  );
  // console.log("filteredData", filteredData)
  const dataLength = filteredData?.length;

  const handleVerify = async (orderId: string) => {
    const toastId = toast.loading("verifying...");
    const res = await verifyOrder({ order_id: orderId });
    if (res?.data) {
      toast.success("Order verified successfully.", { id: toastId });
    } else {
      toast.error("Failed to verify order.", { id: toastId });
    }
  };
  
  if (isLoading) return <Loading />;
  console.log(data, "all order");
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between items-center pr-1">
        <input
          className="p-2 my-3 border-black border-2 text-black rounded-md"
          type="text"
          placeholder="Search id..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="w-full  text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-50 uppercase bg-slate-700  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              user Email
            </th>
            <th scope="col" className="px-6 py-3">
              Total Price
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Id
            </th>

            <th scope="col" className="px-6 py-3">
              Status
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Details
            </th>
          </tr>
        </thead>
        {(dataLength as number) > 0 && (
          <tbody>
            {filteredData?.map((item) => (
              <tr
                key={item?._id}
                className="odd:bg-white  even:bg-gray-50 0 border-b  border-gray-200"
              >
                <td className="px-6 py-4">{item?._id}</td>
                <td className="px-6 py-4">{item?.user?.email}</td>
                <td className="px-6 py-4">{item?.totalPrice}</td>
                <td className="px-6 py-4">{item?.transaction?.id}</td>
                <td className="px-6 py-4">{item?.status}</td>
                <td className="px-6 py-4">
                  {item?.status.toLowerCase() === "pending" ? (
                    <Button
                      className="w-[120px]"
                      onClick={() => handleVerify(item?.transaction?.id)}
                    >
                      Verify Order
                    </Button>
                  ) : (
                    <Button className="bg-green-700 hover:bg-green-700 cursor-default w-[120px]">
                      Verified
                    </Button>
                  )}
                </td>
                <td className="px-6 py-4">
                  {/* <Button className="w-[120px]">Details</Button> */}
                  <OrderProductDetails orderItems={item} />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {dataLength === 0 && (
        <div className="w-full h-[150px] grid place-items-center text-2xl ">
          <p>Not Found any order</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrder;








// import { useState } from "react";
// import { toast } from "sonner";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogClose,
// } from "../components/ui/dialog";
// import {
//   useAllOrdersQuery,
//   useVerifyOrderMutation,
// } from "../redux/feature/orderManage/orderApi";
// import Loading from "../pages/Loading";
// import { Button } from "../components/ui/button";
// import { IOrder, IProduct } from "../types/type";

// export const AdminOrder = () => {
//   const { data, isLoading } = useAllOrdersQuery(undefined);
//   const [verifyOrder] = useVerifyOrderMutation();

//   const [search, setSearch] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const openDialog = (order: IOrder) => {
//     setSelectedOrder(order);
//     setIsDialogOpen(true);
//   };

//   const filteredData = data?.data?.filter((item: IOrder) =>
//     item._id.toLowerCase().includes(search.toLowerCase())
//   );
//   const dataLength = filteredData?.length || 0;

//   const handleVerify = async (orderId: string) => {
//     const toastId = toast.loading("Verifying...");
//     const res = await verifyOrder({ order_id: orderId });
//     if (res?.data) {
//       toast.success("Order verified successfully.", { id: toastId });
//     } else {
//       toast.error("Failed to verify order.", { id: toastId });
//     }
//   };

//   if (isLoading) return <Loading />;
//   console.log(data, "all order");

//   return (
//     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//       <div className="flex justify-between items-center pr-1">
//         <input
//           className="p-2 my-3 border-black border-2 text-black rounded-md"
//           type="text"
//           placeholder="Search id..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//         <thead className="text-xs text-gray-50 uppercase bg-slate-700">
//           <tr>
//             <th className="px-6 py-3">Id</th>
//             <th className="px-6 py-3">User Email</th>
//             <th className="px-6 py-3">Total Price</th>
//             <th className="px-6 py-3">Transaction Id</th>
//             <th className="px-6 py-3">Status</th>
//             <th className="px-6 py-3">Action</th>
//             <th className="px-6 py-3">Details</th>
//           </tr>
//         </thead>
//         {dataLength > 0 ? (
//           <tbody>
//             {filteredData?.map((item: IOrder) => (
//               <tr
//                 key={item._id}
//                 className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
//               >
//                 <td className="px-6 py-4">{item._id}</td>
//                 <td className="px-6 py-4">{item.user.email}</td>
//                 <td className="px-6 py-4">{item.totalPrice}</td>
//                 <td className="px-6 py-4">{item.transaction?.id}</td>
//                 <td className="px-6 py-4">{item.status}</td>
//                 <td className="px-6 py-4">
//                   {item.status.toLowerCase() === "pending" ? (
//                     <Button
//                       className="w-[120px]"
//                       onClick={() => handleVerify(item._id)}
//                     >
//                       Verify Order
//                     </Button>
//                   ) : (
//                     <Button className="bg-green-700 hover:bg-green-700 cursor-default w-[120px]">
//                       Verified
//                     </Button>
//                   )}
//                 </td>
//                 <td className="px-6 py-4">
//                   <Button className="w-[120px]" onClick={() => openDialog(item)}>
//                     View
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         ) : (
//           <tbody>
//             <tr>
//               <td colSpan={7} className="text-center py-4">
//                 No orders found
//               </td>
//             </tr>
//           </tbody>
//         )}
//       </table>

//       {/* Shadcn Dialog for Order Details */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Order Details</DialogTitle>
//             <DialogDescription>
//               Details of the selected order
//             </DialogDescription>
//           </DialogHeader>
//           {selectedOrder && (
//             <div>
//               <p>
//                 <strong>Order ID:</strong> {selectedOrder._id}
//               </p>
//               <p>
//                 <strong>User Email:</strong> {selectedOrder.user.email}
//               </p>
//               <p>
//                 <strong>Total Price:</strong> ${selectedOrder.totalPrice}
//               </p>
//               <p>
//                 <strong>Transaction ID:</strong> {selectedOrder.transaction?.id}
//               </p>
//               <p>
//                 <strong>Status:</strong> {selectedOrder.status}
//               </p>
//               <h3 className="mt-4 text-lg font-bold">Products:</h3>
//               <ul className="list-disc ml-5">
//   {selectedOrder?.products?.map(({ product, quantity }) => (
//     <li key={product._id}>
//       {product.name} - ${product.price} ({quantity})
//     </li>
//   ))}
// </ul>

//               <div className="flex justify-end mt-4">
//                 <DialogClose asChild>
//                   <Button className="bg-red-500 hover:bg-red-600">Close</Button>
//                 </DialogClose>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
