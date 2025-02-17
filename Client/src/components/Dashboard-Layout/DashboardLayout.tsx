import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Desktop Sidebar */}
      <div className="w-64 mt-1 mb-1  border-r-amber-400 rounded-lg bg-gray-800 text-white hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 mt-1 mb-1 rounded-lg  border-r-amber-400 left-0 z-50 bg-gray-800 w-64 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="h-full overflow-y-auto">
          <DashboardSidebar />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-gray-800 text-white rounded-md shadow-lg"
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="p-4 md:p-8 mt-16 md:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;