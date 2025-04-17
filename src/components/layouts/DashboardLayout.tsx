import { FC, useState } from "react";
import { Layout, Menu, theme } from "antd";
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

const { Content, Sider } = Layout;

const DashboardLayout: FC = () => {
  const [selectedKey, setSelectedKey] = useState("1");
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
      icon: <UserRoundPen size={25} />,
      label: "Manage Users",
      component: <ManageUsers />,
    },
    {
      key: "2",
      icon: <MdProductionQuantityLimits size={25} />,
      label: "Add Product",
      component: <AddProducts />,
    },
    {
      key: "3",
      icon: <TbReorder size={25} />,
      label: "Manage Orders",
      component: <ManageOrders />,
    },
    {
      key: "4",
      icon: <SiManageiq size={25} />,
      label: "Manage Products",
      component: <ManageProducts />,
    },
  ];

  const selectedComponent = menuItems.find((item) => item.key === selectedKey)
    ?.component || <ManageUsers />;

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="bg-[#115E59] h-screen"
      >
        <h2 className="my-5 p-2 text-white font-orbitron font-bold text-center">
          Admin Dashboard
        </h2>
        {/* <Menu
          mode="inline"
          className="font-orbitron text-[14px] bg-[#115E59] "
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
              style={{ color: "white" }}
            >
              {item.label}
            </Menu.Item>
          ))}
          <Menu.Item
            key="logout"
            icon={<SlLogout size={25} style={{ color: "white" }} />}
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
            {selectedComponent}
          </div>
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
