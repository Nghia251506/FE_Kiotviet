export interface Supplier {
  id: number;
  code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
  note?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface ShopSupplier {
  id: number;
  supplier: Supplier;
  shopId: number;
  currentCostPrice: number;
  debtBalance: number;
  paymentTermDays: number;
  note?: string;
  status: 'ACTIVE' | 'INACTIVE';
  cooperationStartDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierListResponse {
  data: Supplier[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface SupplierCreateRequest {
  code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
  note?: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface SupplierUpdateRequest extends SupplierCreateRequest {
  id: number;
}