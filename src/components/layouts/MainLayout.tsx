import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
