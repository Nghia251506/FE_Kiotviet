import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchSuppliersApi,
  createSupplierApi as addSupplierApi,
  updateSupplierApi,
  deleteSupplierApi,
} from '../../services/SupplierService';
import {Supplier} from '../../types/SupplierType';

interface SupplierState {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
}

const initialState: SupplierState = {
  suppliers: [],
  loading: false,
  error: null,
};

// THUNK: FETCH SUPPLIERS
export const fetchSuppliers = createAsyncThunk<
  Supplier[],
  void,
  {rejectValue: string}
>('supplier/fetchSuppliers', async (_, {rejectWithValue}) => {
  try {
    const suppliers = await fetchSuppliersApi();
    return suppliers;
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Lỗi khi tải nhà cung cấp';
    return rejectWithValue(msg);
  }
});

// THUNK: ADD SUPPLIER
export const addSupplier = createAsyncThunk<
  Supplier,
  Partial<Supplier>,
  {rejectValue: string}
>('supplier/addSupplier', async (supplierData, {rejectWithValue}) => {
  try {
    const newSupplier = await addSupplierApi(supplierData);
    return newSupplier;
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Lỗi khi thêm nhà cung cấp';
    return rejectWithValue(msg);
  }
});
// THUNK: UPDATE SUPPLIER
export const updateSupplier = createAsyncThunk<
  Supplier,
  {id: number; supplierData: Partial<Supplier>},
  {rejectValue: string}
>('supplier/updateSupplier', async ({id, supplierData}, {rejectWithValue}) => {
  try {
    const updatedSupplier = await updateSupplierApi(id, supplierData);
    return updatedSupplier;
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Lỗi khi cập nhật nhà cung cấp';
    return rejectWithValue(msg);
  }
});

// THUNK: DELETE SUPPLIER
export const deleteSupplier = createAsyncThunk<
  number,
  number,
  {rejectValue: string}
>('supplier/deleteSupplier', async (id, {rejectWithValue}) => {
  try {
    await deleteSupplierApi(id);
    return id;
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Lỗi khi xóa nhà cung cấp';
    return rejectWithValue(msg);
  }
});

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH SUPPLIERS
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch suppliers';
      })
      // ADD SUPPLIER
      .addCase(addSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers.push(action.payload);
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add supplier';
      })
      // UPDATE SUPPLIER
      .addCase(updateSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.suppliers.findIndex(
          (supplier) => supplier.id === action.payload.id
        );
        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update supplier';
      })
      // DELETE SUPPLIER
      .addCase(deleteSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = state.suppliers.filter(
          (supplier) => supplier.id !== action.payload
        );
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete supplier';
      });
  },
});

export default supplierSlice.reducer;