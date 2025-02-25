import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../components/home-components/Home';
import Register from "../components/Authenticatio-Related/Register";
import Login from "../components/Authenticatio-Related/Login";
import AboutUs from './../components/About-/AboutUs';
import Cart from "../pages/Cart";
import AdminDashboardIndex from "../Admin/AdminDashboardIndex";


import ProfileUpdate from "../Admin/ProfileUpdate";

import DashboardLayout from "../components/Dashboard-Layout/DashboardLayout";
import UserDashboardIndex from "../User/UserDashboardIndex";
import UserOrders from "../User/UserOrders";
import { DashboardProtected } from "../utils/DashboardProtected";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import AddProduct from "../Admin/AddProducts";
import { AllUsers } from "../Admin/AllUsers";

import OrderPage from "../pages/OrderPage";
import OrderResponse from "../pages/OrderResponse";
import { ProductTable } from "../Admin/ProductTable";
import AdminOrder from "../Admin/AdminOrder";
import { Product } from "../components/product/Product";
import PrivetUserRoute from "../utils/PrivetUserRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>, 
    children: [
        {  
            path: "/",
            element:<Home/>
        },
        {  
            path: "/register",
            element:<Register></Register>
        },
        {  
            path: "/login",
            element:<Login></Login>
        },
        {  
            path: "/about",
            element:<AboutUs></AboutUs>
        },
        {  
            path: "/cart",
            element: <PrivetUserRoute><Cart></Cart> </PrivetUserRoute>
        },
        {  
            path: "/order",
            element:<PrivetUserRoute> <OrderPage></OrderPage> </PrivetUserRoute>
        },
        {  
            path: "/response",
            element: <PrivetUserRoute><OrderResponse></OrderResponse> </PrivetUserRoute>
        },
        {  
            path: "/products",
            element: <Product></Product>
        },
        {  
          path: "/details/:id",
          element: <ProductDetailsPage />,
        },
        {
            path: '/admin/dashboard',
            element: (
              <DashboardProtected role="admin">
                <DashboardLayout />
              </DashboardProtected>
            ),
            
            children: [
              { path: "/admin/dashboard", element: <AdminDashboardIndex /> },
              { path: "/admin/dashboard/products", element: <AddProduct /> },
          
              { path: "/admin/dashboard/orders", element: <AdminOrder /> },
              { path: "/admin/dashboard/product-table", element: <ProductTable></ProductTable> },
              { path: "/admin/dashboard/customer", element: <AllUsers /> },
              { path: "/admin/dashboard/profile-setting", element: <ProfileUpdate /> },
            ],
          },
          {
            path: '/user/dashboard',
            element: (
              <DashboardProtected role="customer">
                <DashboardLayout  />
              </DashboardProtected>
            ),
            children: [
              { path: "/user/dashboard", element: <UserDashboardIndex /> },
              { path: "/user/dashboard/viewOrders", element: <UserOrders/> },
              { path: "/user/dashboard/profile-setting", element: <ProfileUpdate /> },
            ],
          },
     
    
    ],
  },
]);

export default router;
