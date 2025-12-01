import { Plus, Minus, X } from 'lucide-react';

export default function Sales() {
  const cartItems = [
    { id: 1, name: 'Áo thun nam', price: 250000, quantity: 2 },
    { id: 2, name: 'Quần jean nữ', price: 450000, quantity: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Chọn sản phẩm</h2>

          <input
            type="text"
            placeholder="Tìm sản phẩm theo tên, mã SKU, mã vạch..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Áo thun nam', price: '250,000 ₫', image: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&w=200' },
              { name: 'Quần jean nữ', price: '450,000 ₫', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&w=200' },
              { name: 'Giày thể thao', price: '890,000 ₫', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=200' },
              { name: 'Túi xách', price: '650,000 ₫', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=200' },
              { name: 'Đồng hồ', price: '1,200,000 ₫', image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=200' },
              { name: 'Kính mát', price: '350,000 ₫', image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&w=200' },
            ].map((product, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="font-medium text-gray-800 text-sm mb-1">{product.name}</p>
                  <p className="font-bold text-blue-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Giỏ hàng</h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                  <p className="text-blue-600 font-semibold">{item.price.toLocaleString('vi-VN')} ₫</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <button className="text-red-500 hover:text-red-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính:</span>
              <span className="font-medium">{total.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Giảm giá:</span>
              <span className="font-medium">0 ₫</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 pt-3 border-t border-gray-200">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">{total.toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Số điện thoại khách hàng"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
