// src/components/MainLayout.tsx
import React, { useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { IoMdSettings } from "react-icons/io";
import { useAppSelector } from "../redux/hook";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // mặc định collapsed
  const {currentUser, currentShop} = useAppSelector((state) => state.auth);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout className="h-screen">
      {/* Sidebar cố định hoàn toàn */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        collapsedWidth={100}
        className="fixed left-0 top-0 h-full z-50 overflow-hidden"
        style={{ background: '#001529' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <h2 className="text-white fs-5 text-center mb-0">
            <span className="sm-logo">TNS POS </span>
            {!collapsed && <span className="lg-logo">{currentShop?.name}</span>}
          </h2>
        </div>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          onClick={({ key }) => {
            if (key === "signout") {
              // logout
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "dashboard",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Thống kê",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Người dùng",
              children:[
                {key:"suppliers", icon:<AiOutlineUser className="fs-4" />, label:"Nhà cung cấp"},
                {key:"customers", icon:<AiOutlineUser className="fs-4" />, label:"Khách hàng"},
              ]
            },
            {
              key: "Catalog",
              icon: <AiFillProduct className="fs-4" />,
              label: "Hàng Hoá",
              children: [
                { key: "product", icon: <AiOutlineShoppingCart className="fs-4" />, label: "Thêm sản phẩm" },
                { key: "list-product", icon: <AiOutlineShoppingCart className="fs-4" />, label: "Danh sách sản phẩm" },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Đơn hàng",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Mã giảm giá",
              children: [
                { key: "coupon", icon: <ImBlog className="fs-4" />, label: "Thêm mã giảm giá" },
                { key: "coupon-list", icon: <RiCouponLine className="fs-4" />, label: "Danh sách mã giảm giá" },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Phản hồi",
            },
            {
              key: "settings",
              icon: <IoMdSettings className="fs-4" />,
              label: "Cài đặt",
            },
          ]}
          className="flex-1 overflow-y-auto"
        />

        {/* Nút Bán hàng – cố định dưới cùng */}
        <div className="border-t border-gray-600 p-4">
          <button
            onClick={() => navigate("/sales")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium text-base shadow"
          >
            <ShoppingCart className="w-5 h-5" />
            {!collapsed && <span>Bán hàng</span>}
          </button>
        </div>

        {/* User info – ở đáy */}
        <div className="p-4 bg-gray-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">{currentUser?.username}</p>
                <p className="text-xs opacity-80">{currentUser?.email}</p>
              </div>
            )}
          </div>
        </div>
      </Sider>

      {/* Content – lệch phải để không bị đè sidebar */}
      <Layout className={collapsed ? "ml-24" : "ml-52 transition-all duration-300"}> {/* 80px khi collapsed, 280px khi mở */}
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: "25px 0 0 25px",
            background: colorBgContainer,
          }}
        >
            {React.createElement(
            collapsed ? FaToggleOff : FaToggleOn,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow: "auto", // scroll riêng
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;