import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../redux/feature/authManage/authSlice";
import { RootState } from "../../redux/store";
import { useLogOutMutation } from "../../redux/feature/authManage/authApi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [logoutMutation] = useLogOutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation({}).unwrap();
      dispatch(logout());
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const dashboardLink = user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  const getLinkClass = (path: string) => `
    block w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-200 ${
      location.pathname === path
        ? "text-green-400 border-b-2 border-green-400"
        : "text-white hover:bg-gray-700 hover:border-b-2 hover:border-green-400"
    }`;

  const isDashboardRoute = location.pathname.startsWith("/admin/dashboard") || 
                          location.pathname.startsWith("/user/dashboard");

  if (isDashboardRoute) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 mx-4 lg:mx-[70px] rounded-lg mt-2 bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Stationery Shop
            </Link>
          </div>

          {/* Desktop Navigation Items - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className={getLinkClass("/")}>Home</Link>
              <Link to="/products" className={getLinkClass("/products")}>Products</Link>
              <Link to="/about" className={getLinkClass("/about")}>About</Link>
              {user && (
                <Link to={dashboardLink} className={getLinkClass(dashboardLink)}>
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Logout & Cart - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md font-medium transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className={getLinkClass("/login")}>Login</Link>
                <Link to="/register" className={getLinkClass("/register")}>Register</Link>
              </>
            )}
            <Link to="/cart" className="hover:bg-gray-700 p-2 rounded-md relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button - Always visible on mobile */}
          <button onClick={toggleMenu} className="p-2 md:hidden">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <Link to="/" onClick={closeMenu} className={getLinkClass("/")}>
              Home
            </Link>
            <Link to="/products" onClick={closeMenu} className={getLinkClass("/products")}>
              Products
            </Link>
            <Link to="/about" onClick={closeMenu} className={getLinkClass("/about")}>
              About
            </Link>
            {user && (
              <Link to={dashboardLink} onClick={closeMenu} className={getLinkClass(dashboardLink)}>
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full text-left bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md font-medium mt-2 transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className={getLinkClass("/login")}>
                  Login
                </Link>
                <Link to="/register" onClick={closeMenu} className={getLinkClass("/register")}>
                  Register
                </Link>
              </>
            )}
            <Link to="/cart" onClick={closeMenu} className={getLinkClass("/cart")}>
              Cart ({cartItems.length})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;