import axiosClient from '../api/axiosApi';
import { ShopInfo, UserInfo, LoginCredentials } from '../types/authTypes';

export const checkShopApi = async (code: string): Promise<ShopInfo> => {
  const response = await axiosClient.post('/auth/check-shop', { code });
  return response.data;
};

export const loginApi = async (credentials: LoginCredentials): Promise<{
  token: string;
  user: UserInfo;
  shop: ShopInfo;
}> => {
  const response = await axiosClient.post('/auth/login', credentials, {
    withCredentials: true, // Đảm bảo gửi cookie kèm theo yêu cầu
  });
  return response.data;
};

export const fetchMeApi = async (): Promise<UserInfo> => {
  const response = await axiosClient.get('/auth/me');
  return response.data;
};

export const logoutApi = async (): Promise<void> => {
  await axiosClient.post('/auth/logout');
};