// // src/pages/RegisterShopPage.tsx (Tạo gian hàng thử miễn phí)
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// // Giả sử bạn có registerShopApi trong service hoặc thunk riêng
// import { registerShopApi } from '../../services/authService'; // bạn sẽ tạo service này

// const schema = z.object({
//   shopName: z.string().min(1, 'Vui lòng nhập tên gian hàng'),
//   slug: z
//     .string()
//     .min(3, 'Slug ít nhất 3 ký tự')
//     .regex(/^[a-z0-9-]+$/, 'Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
//   code: z.string().min(3, 'Mã gian hàng ít nhất 3 ký tự'),
//   email: z.string().email('Email không hợp lệ'),
//   phone: z.string().regex(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
//   username: z.string().min(3, 'Tên đăng nhập ít nhất 3 ký tự'),
//   password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
// });

// type FormData = z.infer<typeof schema>;

// const RegisterShopPage = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       // Gọi API tạo shop + user admin (BE trả token luôn)
//       const res = await registerShopApi(data);
//       localStorage.setItem('access_token', res.token);
//       localStorage.setItem('shopCode', data.slug);
//       navigate('/dashboard');
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'Tạo gian hàng thất bại');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-2xl p-10 bg-white rounded-2xl shadow-2xl border border-gray-100"
//       >
//         <div className="text-center mb-10">
//           <div className="mx-auto w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
//             TNS
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800">Tạo gian hàng thử miễn phí</h1>
//           <p className="text-gray-600 mt-2">Dùng thử đầy đủ tính năng trong 14 ngày</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Tên gian hàng</label>
//             <input {...register('shopName')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//             {errors.shopName && <p className="text-red-600 text-sm">{errors.shopName.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
//             <input {...register('slug')} placeholder="cafe-hanh" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//             {errors.slug && <p className="text-red-600 text-sm">{errors.slug.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Mã gian hàng</label>
//             <input {...register('code')} placeholder="CAFEHANH" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//             {errors.code && <p className="text-red-600 text-sm">{errors.code.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input type="email" {...register('email')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//             {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
//             <input {...register('phone')} placeholder="0901234567" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//             {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập admin</label>
//             <input {...register('username')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//             {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu admin</label>
//             <input type="password" {...register('password')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//             {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
//           </div>

//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-lg hover:from-green-700 hover:to-teal-700 disabled:opacity-60 transition shadow-md"
//             >
//               {isSubmitting ? 'Đang tạo gian hàng...' : 'Tạo gian hàng miễn phí'}
//             </button>
//           </div>
//         </form>

//         <p className="mt-8 text-center text-sm text-gray-500">
//           Đã có gian hàng?{' '}
//           <span
//             className="text-blue-600 hover:underline cursor-pointer font-medium"
//             onClick={() => navigate('/check-shop')}
//           >
//             Đăng nhập ngay
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default RegisterShopPage;