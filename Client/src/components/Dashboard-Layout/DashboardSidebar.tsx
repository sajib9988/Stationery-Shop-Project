import { Link, useLocation } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import { BsBorderStyle, BsTable } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { TUser, useCurrentToken } from "../../redux/feature/authManage/authSlice";

// Define the type for menu items
interface MenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

const adminMenuItems: MenuItem[] = [
  { name: "Dashboard", path: "/", icon: <IoIosHome className="w-5 h-5" /> },
  { name: "Add Product", path: "/admin/dashboard/products", icon: <AiOutlineProduct className="w-5 h-5" /> },
  { name: "Orders", path: "/admin/dashboard/orders", icon: <BsBorderStyle className="w-5 h-5" /> },
  { name: "Product Table", path: "/admin/dashboard/product-table", icon: <BsTable className="w-5 h-5" /> },
  { name: "Users", path: "/admin/dashboard/customer", icon: <FaUsersCog className="w-5 h-5" /> },
  { name: "Profile Settings", path: "/admin/dashboard/profile-setting", icon: <IoMdSettings className="w-5 h-5" /> },
];

const customerMenuItems: MenuItem[] = [
  { name: "Dashboard", path: "/", icon: <IoIosHome className="w-5 h-5" /> },
  { name: "View Orders", path: "/user/dashboard/viewOrders", icon: <MdGridView className="w-5 h-5" /> },
  { name: "Profile Settings", path: "/user/dashboard/profile-setting", icon: <IoMdSettings className="w-5 h-5" /> },
];

const DashboardSidebar = () => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();
  let isUser: TUser | null = null;
  let menuItems: MenuItem[] = adminMenuItems;

  if (token) {
    isUser = verifyToken(token) as TUser;
    menuItems = isUser.role === "admin" ? adminMenuItems : customerMenuItems;
  }

  return (
    <div className="h-full py-4">
      <ul className="space-y-2 px-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium text-white transition-colors ${
                location.pathname === item.path
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              aria-label={item.name}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
