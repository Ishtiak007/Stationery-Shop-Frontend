import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MainLayout;
