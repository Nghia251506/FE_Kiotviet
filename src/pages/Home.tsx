import React from "react";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* NAVBAR */}
      <div className="w-full flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="KiotViet"
            className="h-8"
          />
        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#">Sản phẩm</a>
          <a href="#">Giải pháp</a>
          <a href="#">Khách hàng</a>
          <a href="#">Phí dịch vụ</a>
          <a href="#">Hỗ trợ</a>
          <a href="#">Tin tức</a>
          <a href="#">Về KiotViet</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50">
            Đăng nhập
          </button>
          <button className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700">
            Đăng ký
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="w-full px-10 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* LEFT CONTENT */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Phần mềm <br /> quản lý bán hàng <br /> phổ biến nhất
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium text-lg hover:bg-blue-700">
              Dùng thử miễn phí
            </button>
            <button className="px-6 py-3 rounded-full bg-blue-100 text-blue-700 font-medium text-lg flex items-center gap-2 hover:bg-blue-200">
              Khám phá <span className="text-xl">▶</span>
            </button>
          </div>

          <div className="text-gray-700 font-medium text-lg mb-6">
            <p>300.000+ nhà kinh doanh sử dụng</p>
            <p>10.000+ nhà kinh doanh mới mỗi tháng</p>
          </div>

          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            Mới — Phiên bản dành riêng cho Kiều Bào Việt tại nước ngoài
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center relative">
          <img
            src="/hero-girl.png"
            alt="Hero"
            className="w-[480px] rounded-3xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
