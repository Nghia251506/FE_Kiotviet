// src/pages/LoginPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { login } from '../redux/slice/authSlice';
import Logo from '../global/ChatGPT Image 18_46_02 21 thg 12, 2025.png';
import { RootState } from '../redux/store';

const schema = z.object({
  username: z.string().min(1, 'Vui lòng nhập tên đăng nhập'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, currentShop } = useAppSelector((state: RootState) => state.auth);

  const shopCode = localStorage.getItem('shopCode') || currentShop?.code || 'gian hàng';

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const credentials = {
      shopCode,
      username: data.username,
      password: data.password,
    };

    const result = await dispatch(login(credentials));

    if (login.fulfilled.match(result)) {
      navigate('/dashboard');
    }
    // error sẽ hiển thị từ store
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
          <div className="mx-auto w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
            <img src={Logo} alt="Logo" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Đăng nhập vào {currentShop?.name || shopCode}
          </h1>
          <p className="text-gray-600 mt-2">Sử dụng tài khoản quản trị của bạn</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              placeholder="admin hoặc tên tài khoản"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              {...register('username')}
            />
            {formErrors.username && (
              <p className="mt-2 text-sm text-red-600">{formErrors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              {...register('password')}
            />
            {formErrors.password && (
              <p className="mt-2 text-sm text-red-600">{formErrors.password.message}</p>
            )}
          </div>

          {error && <p className="text-center text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-md"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Quên mật khẩu?
          </a>
        </p>

        <p className="mt-4 text-center text-sm text-gray-500">
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/check-shop')}
          >
            ← Thay đổi gian hàng
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;