import { FC, useState } from "react";
import { Layout, Menu, theme } from "antd";
import Footer from "../shared/Footer";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ManageUsers from "@/pages/Admin/ManageUsers";
import ManageOrders from "@/pages/Admin/ManageOrders";
import { LuListOrdered } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { SlLogout } from "react-icons/sl";

const { Content, Sider } = Layout;

const UserDashboardLayout: FC = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "1",
      icon: <LuListOrdered size={25} />,
      label: "Recent Orders",
      component: <ManageOrders />,
    },
    {
      key: "2",
      icon: <CgProfile size={25} />,
      label: "Profile",
      // component: <MyProfile />,
    },
    {
      key: "3",
      icon: <ImProfile size={25} />,
      label: "Profile Update",
      // component: <UpdateProfile />,
    },
  ];

  const selectedComponent = menuItems.find((item) => item.key === selectedKey)
    ?.component || <ManageUsers />;

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <h2 className="border rounded shadow-xl mb-4 p-2 text-blue-400 font-orbitron font-bold">
          Dashboard
        </h2>
        <Menu
          theme="dark"
          mode="inline"
          className="font-orbitron text-[14px]"
          defaultSelectedKeys={["1"]}
          onClick={(e) => setSelectedKey(e.key)}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
          {/* Fix Logout issue by adding onClick event here */}
          <Menu.Item
            key="5"
            icon={<SlLogout size={25} />}
            onClick={handleLogOut}
          >
            Logout
          </Menu.Item>
        </Menu>
        <Link to="/">
          <button className="flex items-center ml-7 mt-2 gap-2 text-white">
            <FaHome size={25} /> <span className="text-[14px]">Home</span>
          </button>
        </Link>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: "1rem",
            }}
          >
            {selectedComponent} {/* Show the selected component */}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default UserDashboardLayout;
