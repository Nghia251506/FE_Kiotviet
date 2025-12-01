import { Plus, Search, Phone, Mail } from 'lucide-react';

export default function Customers() {
  const customers = [
    { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', email: 'nguyenvana@email.com', orders: 12, total: '5,450,000 ₫' },
    { id: 2, name: 'Trần Thị B', phone: '0912345678', email: 'tranthib@email.com', orders: 8, total: '3,200,000 ₫' },
    { id: 3, name: 'Lê Văn C', phone: '0923456789', email: 'levanc@email.com', orders: 15, total: '7,890,000 ₫' },
    { id: 4, name: 'Phạm Thị D', phone: '0934567890', email: 'phamthid@email.com', orders: 5, total: '2,100,000 ₫' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Khách hàng</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin khách hàng</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Thêm khách hàng
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, số điện thoại, email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {customers.map((customer) => (
            <div key={customer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {customer.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{customer.name}</p>
                  <p className="text-xs text-gray-500">{customer.orders} đơn hàng</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Tổng chi tiêu</p>
                <p className="font-bold text-blue-600">{customer.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
