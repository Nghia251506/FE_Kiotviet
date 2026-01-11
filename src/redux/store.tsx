import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import customerReducer from './slice/customerSlice';
import supplierReducer from './slice/SupplierSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    // thêm các slice khác sau: category, product...
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;