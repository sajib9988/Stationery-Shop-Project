import { useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { useAllUserQuery, useUpdateBlockedUserMutation } from "../redux/feature/UserApi/userApi";
import Loading from "../pages/Loading";
import { Button } from "../components/ui/button";
import { IUser } from "../types/type";

export function AllUsers() {
  const { isLoading, data, error } = useAllUserQuery(undefined);
  const [updateBlockedUser] = useUpdateBlockedUserMutation();
  const [search, setSearch] = useState("");

  const filteredData: IUser[] = data?.data?.filter((item: IUser) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleBlockUser = async (id: string, isBlocked: boolean) => {
    const data = { isBlocked };
    const res = await updateBlockedUser({ id, data });
    if (res?.data) {
      toast.success(`User ${isBlocked ? "blocked" : "unblocked"} successfully.`, { duration: 3000 });
    } else if (res?.error) {
      toast.error("Admin cannot be blocked.", { duration: 3000 });
    } else {
      toast.error("Failed to update user status.", { duration: 3000 });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading users.</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Centered Search Field */}
      <div className="flex justify-center my-3">
        <input
          className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-50 uppercase bg-slate-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Active
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {filteredData.length > 0 ? (
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <img src={item.profileImage} className="w-8 h-8 rounded-full" alt={`${item.name}'s profile`} />
                </th>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4">
                  {item.isBlocked ? <FaTimes className="w-4 text-red-500" /> : <FaCheck className="w-4 text-green-500" />}
                </td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => handleBlockUser(item._id, !item.isBlocked)}
                    className={item.isBlocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                  >
                    {item.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className="w-full h-[150px] grid place-items-center text-2xl">
            <p>No users found</p>
          </div>
        )}
      </table>
    </div>
  );
}