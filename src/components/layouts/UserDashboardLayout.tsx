import { FC, useState } from "react";
import { Layout, Menu, Button, Drawer, theme, Grid } from "antd";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ManageOrdersUser from "@/pages/UserDashboard/ManageOrdersUser";
import MyProfile from "@/pages/UserDashboard/MyProfile";
import UpdateProfile from "@/pages/UserDashboard/UpdateProfile";
import { LuListOrdered } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { SlLogout } from "react-icons/sl";
import { MenuOutlined } from "@ant-design/icons";
import DashboardFooter from "../shared/DashboardFooter";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const UserDashboardLayout: FC = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",
      icon: <CgProfile size={20} />,
      label: "Profile",
      component: <MyProfile />,
    },
    {
      key: "2",
      icon: <LuListOrdered size={20} />,
      label: "Order History",
      component: <ManageOrdersUser />,
    },
    {
      key: "3",
      icon: <ImProfile size={20} />,
      label: "Update Profile",
      component: <UpdateProfile />,
    },
  ];

  const selectedComponent =
    menuItems.find((item) => item.key === selectedKey)?.component || null;

  const renderMenu = () => (
    <Menu
      mode="inline"
      className="font-orbitron text-[14px] bg-[#115E59] h-full"
      selectedKeys={[selectedKey]}
      onClick={(e) => {
        if (e.key === "logout") {
          handleLogOut();
        } else {
          setSelectedKey(e.key);
          setIsDrawerVisible(false); // Close drawer on selection
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
        icon={<SlLogout size={20} />}
        style={{
          color: "white",
          backgroundColor: selectedKey === "logout" ? "#077A7D" : "transparent",
        }}
      >
        Logout
      </Menu.Item>
      <Menu.Item
        key="home"
        icon={<FaHome size={20} />}
        style={{ color: "white" }}
      >
        <Link to="/">Home</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Layout className="min-h-screen">
        {/* Desktop Sider */}
        {screens.lg && (
          <Sider width={220} className="bg-[#115E59]">
            <div className="py-4 px-2 text-center text-white font-bold text-lg">
              User Dashboard
            </div>
            {renderMenu()}
          </Sider>
        )}

        <Layout className="flex-1">
          {/* Mobile Header */}
          {!screens.lg && (
            <div className="bg-[#115E59] p-4 flex items-center justify-between">
              <h2 className="text-white text-lg font-bold">User Dashboard</h2>
              <Button
                icon={<MenuOutlined />}
                onClick={() => setIsDrawerVisible(true)}
                type="text"
                className="text-white"
              />
            </div>
          )}

          {/* Mobile Drawer */}
          <Drawer
            title="Menu"
            placement="left"
            onClose={() => setIsDrawerVisible(false)}
            open={isDrawerVisible}
            bodyStyle={{ padding: 0, backgroundColor: "#115E59" }}
          >
            {renderMenu()}
          </Drawer>

          {/* Main Content */}
          <Content className="p-4 sm:p-6 md:p-8 bg-[#F5F5F5] flex-grow">
            <div
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                padding: 24,
                minHeight: 360,
              }}
            >
              {selectedComponent}
            </div>
          </Content>
        </Layout>
      </Layout>

      <DashboardFooter />
    </div>
  );
};

export default UserDashboardLayout;
