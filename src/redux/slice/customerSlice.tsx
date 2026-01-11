import customerService from '../../services/customerService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Customer } from '../../types/CustomerType';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

// THUNK: FETCH CUSTOMERS
export const fetchCustomers = createAsyncThunk<
  Customer[],
  void,
  { rejectValue: string }
>('customer/fetchCustomers', async (_, { rejectWithValue }) => {
  try {
    const customers = await customerService.getCustomers();
    return customers;
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Lỗi khi tải danh sách khách hàng';
    return rejectWithValue(msg);
  }
});
// THUNK: ADD CUSTOMER
export const addCustomer = createAsyncThunk<
  Customer,
  Omit<Customer, 'id'>,
  { rejectValue: string }
>('customer/addCustomer', async (customerData, { rejectWithValue }) => {
  try {
    const newCustomer = await customerService.createCustomer(customerData);
    return newCustomer;
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Lỗi khi thêm khách hàng';
    return rejectWithValue(msg);
  }
});
// THUNK: DELETE CUSTOMER
export const deleteCustomer = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('customer/deleteCustomer', async (customerId, { rejectWithValue }) => {
  try {
    await customerService.deleteCustomer(customerId);
    return customerId;
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Lỗi khi xóa khách hàng';
    return rejectWithValue(msg);
  }
});

//THUNK: UPDATE CUSTOMER
export const updateCustomer = createAsyncThunk<
  Customer,
  { id: number; data: Partial<Omit<Customer, 'id'>> },
  { rejectValue: string }
>('customer/updateCustomer', async ({ id, data }, { rejectWithValue }) => {
  try {
    const updatedCustomer = await customerService.updateCustomer(id, data);
    return updatedCustomer;
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Lỗi khi cập nhật khách hàng';
    return rejectWithValue(msg);
  }
});

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Lỗi khi tải danh sách khách hàng';
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Lỗi khi thêm khách hàng';
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Lỗi khi xóa khách hàng';
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.customers.findIndex(
          (customer) => customer.id === action.payload.id
        );
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Lỗi khi cập nhật khách hàng';
      });
  },
});

export default customerSlice.reducer;