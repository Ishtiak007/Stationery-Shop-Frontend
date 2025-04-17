import { FC, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ManageUsers from "@/pages/Admin/ManageUsers";
import { LuListOrdered } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { SlLogout } from "react-icons/sl";
import MyProfile from "@/pages/UserDashboard/MyProfile";
import UpdateProfile from "@/pages/UserDashboard/UpdateProfile";
import DashboardFooter from "../shared/DashboardFooter";
import ManageOrdersUser from "@/pages/UserDashboard/ManageOrdersUser";

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
      icon: <CgProfile size={25} />,
      label: "Profile",
      component: <MyProfile />,
    },
    {
      key: "2",
      icon: <LuListOrdered size={25} />,
      label: "Order history",
      component: <ManageOrdersUser />,
    },
    {
      key: "3",
      icon: <ImProfile size={25} />,
      label: "Update Profile",
      component: <UpdateProfile />,
    },
  ];

  const selectedComponent = menuItems.find((item) => item.key === selectedKey)
    ?.component || <ManageUsers />;

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="bg-[#115E59] min-h-screen"
      >
        <h2 className="my-5 p-2 text-white font-orbitron font-bold text-center">
          User Dashboard
        </h2>
        {/* <Menu
          mode="inline"
          className="text-[14px] bg-[#115E59]"
          defaultSelectedKeys={["1"]}
          onClick={(e) => setSelectedKey(e.key)}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
          <Menu.Item
            key="5"
            icon={<SlLogout size={25} />}
            onClick={handleLogOut}
          >
            Logout
          </Menu.Item>
        </Menu> */}
        <Menu
          mode="inline"
          className="font-orbitron text-[14px] bg-[#115E59]"
          selectedKeys={[selectedKey]}
          onClick={(e) => {
            if (e.key === "logout") {
              handleLogOut();
            } else {
              setSelectedKey(e.key);
            }
          }}
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={{
                color: "white",
                backgroundColor:
                  selectedKey === item.key ? "#077A7D" : "transparent",
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
          <Menu.Item
            key="logout"
            icon={<SlLogout size={25} />}
            style={{
              color: "white",
              backgroundColor:
                selectedKey === "logout" ? "#077A7D" : "transparent",
            }}
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
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default UserDashboardLayout;
