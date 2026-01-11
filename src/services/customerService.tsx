import axiosClient from "../api/axiosApi";
import { Customer } from "../types/CustomerType";

const customerService = {
  getCustomers: (): Promise<Customer[]> => {
    return axiosClient.get("/public/customers");
  },

  getCustomerById: (id: number): Promise<Customer> => {
    return axiosClient.get(`/public/customers/${id}`);
  },

  createCustomer: (data: Omit<Customer, "id">): Promise<Customer> => {
    return axiosClient.post("/public/customers", data);
  },

  updateCustomer: (id: number, data: Partial<Omit<Customer, "id">>): Promise<Customer> => {
    return axiosClient.put(`/public/customers/${id}`, data);
  },

  deleteCustomer: (id: number): Promise<void> => {
    return axiosClient.delete(`/public/customers/${id}`);
  },
};

export default customerService;