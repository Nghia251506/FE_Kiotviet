// src/pages/SettingPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'; // npm install @headlessui/react
import { Settings, User, Store, FileText, Link, BarChart2 } from 'lucide-react';
import {useAppSelector} from '../redux/hook';

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {currentShop, currentUser} = useAppSelector((state) => state.auth);
  console.log('Current Shop in SettingPage:', currentShop);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Cài đặt hệ thống</h1>

      <TabGroup selectedIndex={activeTab} onChange={setActiveTab}>
        <TabList className="flex space-x-1 rounded-lg bg-blue-50 p-1 border border-blue-200 overflow-x-auto">
          {[
            { label: 'Cài đặt chung', icon: Settings },
            { label: 'Tài khoản & Nhân viên', icon: User },
            { label: 'Chi nhánh & Trụ sở', icon: Store },
            { label: 'Hóa đơn & In ấn', icon: FileText },
            { label: 'Tích hợp bên thứ 3', icon: Link },
            { label: 'Báo cáo & Thông báo', icon: BarChart2 },
          ].map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `flex items-center space-x-2 py-3 px-6 text-sm font-medium rounded-md transition
                ${selected ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:text-blue-600 hover:bg-white/50'}`
              }
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-4">
          {/* 1. Cài đặt chung */}
          <TabPanel className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Cài đặt chung</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tên gian hàng</label>
                  <input type="text" defaultValue={currentShop?.name} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" defaultValue={currentShop?.email} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                  <input type="tel" defaultValue={currentShop?.phone} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                  <input type="text" defaultValue={currentShop?.address} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Logo</label>
                  <input type="file" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tiền tệ</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    <option>VND</option>
                    <option>USD</option>
                  </select>
                </div>
              </div>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Lưu thay đổi</button>
            </form>
          </TabPanel>

          {/* 2. Tài khoản & Nhân viên */}
          <TabPanel className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Tài khoản & Nhân viên</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">{currentUser?.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{currentUser?.roleName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{currentUser?.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:underline">Sửa</button> | <button className="text-red-600 hover:underline">Xóa</button>
                    </td>
                  </tr>
                  {/* Thêm row static khác */}
                </tbody>
              </table>
            </div>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Thêm nhân viên mới</button>
          </TabPanel>

          {/* 3. Chi nhánh */}
          <TabPanel className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Chi nhánh & Trụ sở</h2>
            {/* Table chi nhánh static */}
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Thêm chi nhánh mới</button>
          </TabPanel>

          {/* 4. Hóa đơn & In ấn */}
          <TabPanel className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Hóa đơn & In ấn</h2>
            {/* Form template bill, logo footer */}
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Lưu template</button>
          </TabPanel>

          {/* 5. Tích hợp */}
          <TabPanel className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Tích hợp bên thứ 3</h2>
            {/* Form tích hợp GHTK, GHN, Momo, ZaloPay */}
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Kết nối</button>
          </TabPanel>

          {/* 6. Báo cáo & Thông báo */}
          <TabPanel className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Báo cáo & Thông báo</h2>
            {/* Setting format báo cáo, thông báo Zalo */}
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Lưu cài đặt</button>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </motion.div>
  );
};

export default SettingPage;