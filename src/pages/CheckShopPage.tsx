// src/pages/CheckShopPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../redux/hook'; // typed hooks Redux
import {checkShop} from '../redux/slice/authSlice'; // thunk mới
import Logo from '../global/ChatGPT Image 18_46_02 21 thg 12, 2025.png';
const schema = z.object({
  shopCode: z
    .string()
    .min(1, 'Vui lòng nhập tên gian hàng')
    .regex(/^[a-z0-9-]+$/, 'Chỉ dùng chữ thường, số và dấu gạch ngang (-)'),
});

type FormData = z.infer<typeof schema>;

const CheckShopPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth); // lấy loading/error từ store

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const result = await dispatch(checkShop(data.shopCode));

    if (checkShop.fulfilled.match(result)) {
      // Thành công → lưu shopCode tạm và chuyển sang login
      localStorage.setItem('shopCode', data.shopCode);
      navigate('/login');
    }
    // Nếu lỗi → error đã có trong store → hiển thị dưới form
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        <div className="text-center mb-10">
          {/* Thay bằng logo thật của bạn */}
          <div className="mx-auto w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
            <img src={Logo} alt="Logo" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Trọng Nghĩa Software</h1>
          <p className="text-gray-600 mt-2">Phần mềm quản lý bán hàng hiện đại</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="shopCode" className="block text-lg font-medium text-gray-700 mb-2">
              Nhập tên gian hàng của bạn
            </label>
            <input
              id="shopCode"
              type="text"
              placeholder="ví dụ: cafe-hanh"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              {...register('shopCode')}
            />
            {formErrors.shopCode && (
              <p className="mt-2 text-sm text-red-600">{formErrors.shopCode.message}</p>
            )}
          </div>

          {/* Hiển thị lỗi từ API (store) */}
          {error && <p className="text-center text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-md"
          >
            {loading ? 'Đang kiểm tra...' : 'Tiếp tục →'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Chưa có gian hàng?{' '}
          <a href="/register-shop" className="text-blue-600 hover:underline font-medium">
            Tạo gian hàng thử miễn phí
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default CheckShopPage;