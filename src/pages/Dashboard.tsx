import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { icon: DollarSign, label: 'Doanh thu hôm nay', value: '15,750,000 ₫', trend: '+12.5%', positive: true },
    { icon: ShoppingBag, label: 'Đơn hàng', value: '156', trend: '+8.2%', positive: true },
    { icon: Users, label: 'Khách hàng mới', value: '23', trend: '+15.3%', positive: true },
    { icon: TrendingUp, label: 'Tăng trưởng', value: '28%', trend: '+5.1%', positive: true },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tổng quan</h1>
        <p className="text-gray-600 mt-1">Theo dõi hoạt động kinh doanh của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Doanh thu 7 ngày qua</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 80, 70, 90, 85, 95, 88].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-500">T{index + 2}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Đơn hàng gần đây</h2>
          <div className="space-y-4">
            {[
              { id: '#DH001', customer: 'Nguyễn Văn A', amount: '450,000 ₫', status: 'completed' },
              { id: '#DH002', customer: 'Trần Thị B', amount: '820,000 ₫', status: 'completed' },
              { id: '#DH003', customer: 'Lê Văn C', amount: '1,200,000 ₫', status: 'pending' },
              { id: '#DH004', customer: 'Phạm Thị D', amount: '350,000 ₫', status: 'completed' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
