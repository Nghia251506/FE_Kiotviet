// src/redux/slices/authSlice.ts – PHIÊN BẢN HOÀN HẢO NHẤT CHO TNS 2025 (FIXED)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, checkShopApi, fetchMeApi, logoutApi } from '../../services/authService';
import { UserInfo, ShopInfo } from '../../types/authTypes';

interface AuthState {
  currentUser: UserInfo | null;
  currentShop: ShopInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  currentShop: null,
  loading: false,
  error: null,
};

// THUNK: CHECK SHOP
export const checkShop = createAsyncThunk<
  ShopInfo,
  string,
  { rejectValue: string }
>('auth/checkShop', async (shopCode, { rejectWithValue }) => {
  try {
    const shop = await checkShopApi(shopCode.trim());
    return shop;
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Gian hàng không tồn tại';
    return rejectWithValue(msg);
  }
});

// THUNK LOGIN – SỬA ĐỂ TRẢ USER TRỰC TIẾP + TẠO SHOP
export const login = createAsyncThunk<
  { user: UserInfo; shop: ShopInfo },
  { username: string; password: string; shopCode: string },
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    await loginApi(credentials); // BE set cookie

    const meRes = await fetchMeApi(); // meRes là user object như bạn gửi

    // Tạo shop từ dữ liệu có sẵn
    const shop: ShopInfo = {
      id: meRes.shop?.id || 0,
      code: meRes.shopCode || credentials.shopCode,
      name: meRes.shop?.name || credentials.shopCode,
      slug: ''
    };

    return {
      user: meRes as UserInfo, // trả user trực tiếp
      shop,
    };
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Sai tài khoản hoặc mật khẩu';
    return rejectWithValue(msg);
  }
});

// THUNK CHECK AUTH – SỬA TƯƠNG TỰ
export const checkAuth = createAsyncThunk<
  { user: UserInfo; shop: ShopInfo },
  void,
  { rejectValue: string }
>('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const meRes = await fetchMeApi(); // user object

    const savedShopCode = localStorage.getItem('shopCode') || meRes.shopCode || 'unknown';

    const shop: ShopInfo = {
      id: meRes.shopId || 0,
      code: savedShopCode,
      name: savedShopCode,
      slug: ''
    };

    return {
      user: meRes as UserInfo,
      shop,
    };
  } catch (err) {
    localStorage.removeItem('access_token');
    return rejectWithValue('Phiên đăng nhập hết hạn');
  }
});

// THUNK: LOGOUT
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await logoutApi();
  } catch (err) {
    console.warn('Logout endpoint not available');
  } finally {
    localStorage.removeItem('access_token');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.currentUser = null;
      state.currentShop = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CHECK SHOP
      .addCase(checkShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkShop.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShop = action.payload;
      })
      .addCase(checkShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Gian hàng không tồn tại';
        state.currentShop = null;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.currentShop = action.payload.shop;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đăng nhập thất bại';
        state.currentUser = null;
        state.currentShop = null;
      })

      // CHECK AUTH (F5)
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.currentShop = action.payload.shop;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.currentUser = null;
        state.currentShop = null;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.currentShop = null;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;