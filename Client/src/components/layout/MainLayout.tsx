import { Outlet } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import Navbar from "../home-components/Navbar";

const MainLayout = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-xl shadow-lg border-2 border-green-500 overflow-hidden">
      <div className="flex flex-col min-h-screen ">
        <ScrollToTop />
        <Navbar />
        {/* Main content */}
        <div className="flex-grow">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default MainLayout;
