import App from "@/App";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./PrivateRoutes";
import Dashboard from "@/components/Dashboard/Dashboard";
import AllStationeryProducts from "@/pages/AllProducts/AllStationeryProducts";
import ProductDetails from "@/pages/AllProducts/ProductDetails";

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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role={["user", "admin"]}>
        <Dashboard></Dashboard>
      </ProtectedRoute>
    ),
  },
]);
export default router;
