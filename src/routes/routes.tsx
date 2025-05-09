import App from "@/App";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./PrivateRoutes";
import Dashboard from "@/components/Dashboard/Dashboard";
import AllStationeryProducts from "@/pages/AllProducts/AllStationeryProducts";
import ProductDetails from "@/pages/AllProducts/ProductDetails";
import Cart from "@/pages/Cart/Cart";
import OrderVerification from "@/pages/Cart/VerifyOrder";
import About from "@/pages/About/About";
import ContactUs from "@/pages/ContactUs/ContactUs";
import ProductUpdate from "@/pages/Admin/ProductUpdate";

const router = createBrowserRouter([
  {
    path: "",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/all-product",
        element: <AllStationeryProducts />,
      },
      {
        path: "/product/:id",
        element: (
          <ProtectedRoute role={["admin", "user"]}>
            <ProductDetails></ProductDetails>
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute role={["admin", "user"]}>
            <Cart></Cart>
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders/verify",
        element: <OrderVerification></OrderVerification>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role={["user", "admin"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/update/:id",
    element: (
      <ProtectedRoute role={["admin"]}>
        <ProductUpdate />
      </ProtectedRoute>
    ),
  },
]);
export default router;
