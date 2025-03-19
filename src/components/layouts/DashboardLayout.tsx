import { FC, useState } from "react";
import { Layout, Menu, theme } from "antd";
import Footer from "../shared/Footer";
import {
  FilePlus,
  UserRoundPen,
  SendToBack,
  FolderKanban,
  LogOut,
  HomeIcon,
} from "lucide-react";
import Home from "@/pages/Home/Home";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import ManageUsers from "@/pages/Admin/ManageUsers";

const { Content, Sider } = Layout;

const DashboardLayout: FC = () => {
  const [selectedKey, setSelectedKey] = useState("1"); // Track selected menu key
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
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
      icon: <UserRoundPen />,
      label: "Manage Users",
      component: <ManageUsers />,
    },
    {
      key: "3",
      icon: <FilePlus />,
      label: "Add Product",
      // component: <AddProducts />,
    },
    {
      key: "4",
      icon: <SendToBack />,
      label: "Manage Orders",
      // component: <ManageOrders />,
    },
    {
      key: "5",
      icon: <FolderKanban />,
      label: "Manage Products",
      // component: <ManageProducts />,
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
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
          <Menu.Item key="logout" icon={<LogOut />} danger>
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
            {selectedComponent}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
