import { FC, useState } from "react";
import { Layout, Menu, Button, Drawer, theme, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { UserRoundPen } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import ManageUsers from "@/pages/Admin/ManageUsers";
import ManageProducts from "@/pages/Admin/ManageProducts";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import { MdProductionQuantityLimits } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import { TbReorder } from "react-icons/tb";
import AddProducts from "@/pages/Admin/AddProducts";
import ManageOrders from "@/pages/Admin/ManageOrders";
import DashboardFooter from "../shared/DashboardFooter";
import { CgProfile } from "react-icons/cg";
import MyProfile from "@/pages/UserDashboard/MyProfile";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const DashboardLayout: FC = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogOut = () => {
    dispatch(logOut());
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
      icon: <UserRoundPen size={20} />,
      label: "Manage Users",
      component: <ManageUsers />,
    },
    {
      key: "3",
      icon: <MdProductionQuantityLimits size={20} />,
      label: "Add Product",
      component: <AddProducts />,
    },
    {
      key: "4",
      icon: <TbReorder size={20} />,
      label: "Manage Orders",
      component: <ManageOrders />,
    },
    {
      key: "5",
      icon: <SiManageiq size={20} />,
      label: "Manage Products",
      component: <ManageProducts />,
    },
  ];

  const selectedComponent = menuItems.find((item) => item.key === selectedKey)
    ?.component || <ManageUsers />;

  const renderMenu = () => (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      className="font-orbitron text-[14px] bg-[#115E59] h-full"
      onClick={(e) => {
        if (e.key === "logout") {
          handleLogOut();
        } else {
          setSelectedKey(e.key);
          setIsDrawerVisible(false); // close drawer
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
        {/* Show Sider only on large screens */}
        {screens.lg && (
          <Sider width={220} className="bg-[#115E59]">
            <div className="py-4 px-2 text-center text-white font-bold text-lg">
              Admin Dashboard
            </div>
            {renderMenu()}
          </Sider>
        )}

        <Layout className="flex-1">
          {/* Header for Mobile/Tablets */}
          {!screens.lg && (
            <div className="bg-[#115E59] p-4 flex items-center justify-between">
              <h2 className="text-white text-lg font-bold">Admin Dashboard</h2>
              <Button
                icon={<MenuOutlined />}
                onClick={() => setIsDrawerVisible(true)}
                type="text"
                className="text-white"
              />
            </div>
          )}

          {/* Drawer for Mobile/Tablet */}
          <Drawer
            title="Menu"
            placement="left"
            closable
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

          {/* Footer */}
        </Layout>
      </Layout>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
