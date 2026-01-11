// src/features/auth/authTypes.ts
export interface ShopInfo {
  id: number;
  slug: string;
  name: string;
  code: string;
  email: string;
}

export interface UserInfo {
  shopId: number;
  user: UserInfo;
  shop: ShopInfo;
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roleName: string;
  shopCode: string;
  isActive: boolean;
}

export interface AuthState {
  token: string | null;
  user: UserInfo | null;
  shop: ShopInfo | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface LoginCredentials {
  shopCode: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
  shop: ShopInfo;
}

export interface MeResponse {
  // API /me trả về thông tin user đầy đủ hơn nếu cần
  roles: string[];
}