import axiosInstance from './axiosInstance';

// Fetch table config for DataGrid columns
export const fetchTableConfig = async () => {
  const response = await axiosInstance.get('/table-config');
  return response.data;
};

// Example: Fetch all drugs
export const fetchDrugs = async () => {
  const response = await axiosInstance.get('/drugs');
  return response.data;
};

// Example: Fetch a drug by ID
export const fetchDrugById = async (id: string) => {
  const response = await axiosInstance.get(`/drugs/${id}`);
  return response.data;
};

// Example: Create a new drug
export const createDrug = async (drugData: any) => {
  const response = await axiosInstance.post('/drugs', drugData);
  return response.data;
};