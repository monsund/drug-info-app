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
