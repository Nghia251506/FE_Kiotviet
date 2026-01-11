import axiosClient from '../api/axiosApi';
import { Supplier } from '../types/SupplierType';

export const fetchSuppliersApi = async (): Promise<Supplier[]> => {
  const response = await axiosClient.get('/admin/suppliers');
  return response.data;
};

export const createSupplierApi = async (supplierData: Partial<Supplier>): Promise<Supplier> => {
  const response = await axiosClient.post('/admin/suppliers', supplierData);
  return response.data;
};

export const updateSupplierApi = async (id: number, supplierData: Partial<Supplier>): Promise<Supplier> => {
  const response = await axiosClient.put(`/admin/suppliers/${id}`, supplierData);
  return response.data;
};

export const deleteSupplierApi = async (id: number): Promise<void> => {
  await axiosClient.delete(`/admin/suppliers/${id}`);
};