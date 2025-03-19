import { FC, useState } from "react";
import { Layout, Menu, theme } from "antd";
import Footer from "../shared/Footer";
import { LogOut, HomeIcon } from "lucide-react";
import Home from "@/pages/Home/Home";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FaFirstOrder } from "react-icons/fa";
import { RiProfileFill } from "react-icons/ri";
import { MdUpdate } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const { Content, Sider } = Layout;

const UserDashboardLayout: FC = () => {
  const [selectedKey, setSelectedKey] = useState("1"); // Track selected menu key
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
      icon: <HomeIcon />,
      label: "Home",
      component: <Home />,
    },
    {
      key: "2",
      icon: <FaFirstOrder />,
      label: "Recent Orders",
    },
    {
      key: "3",
      icon: <RiProfileFill />,
      label: "Profile",
    },
    {
      key: "4",
      icon: <MdUpdate />,
      label: "Profile Update",
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
          className="font-orbitron text-[10px]"
          defaultSelectedKeys={["1"]}
          onClick={(e) => setSelectedKey(e.key)}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
          {/* Fix Logout issue by adding onClick event here */}
          <Menu.Item key="5" icon={<LogOut />} onClick={handleLogOut}>
            Logout
          </Menu.Item>
        </Menu>
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
