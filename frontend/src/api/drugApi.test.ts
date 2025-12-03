import { fetchTableConfig, fetchDrugs } from './drugApi';
import axiosInstance from './axiosInstance';
import { vi } from 'vitest';

describe('drugApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchTableConfig should fetch table configuration', async () => {
    const mockData = [
      { key: 'id', label: 'Id' },
      { key: 'name', label: 'Name' },
    ];
    vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({ data: mockData });

    const result = await fetchTableConfig();

    expect(axiosInstance.get).toHaveBeenCalledWith('/table-config');
    expect(result).toEqual(mockData);
  });

  it('fetchDrugs should fetch drugs data', async () => {
    const mockData = [
      { id: 1, name: 'Drug A' },
      { id: 2, name: 'Drug B' },
    ];
    vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({ data: mockData });

    const result = await fetchDrugs();

    expect(axiosInstance.get).toHaveBeenCalledWith('/drugs');
    expect(result).toEqual(mockData);
  });
});