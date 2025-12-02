import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

// 🔹 Mock @mui/x-data-grid so its CSS (index.css) is never imported
vi.mock('@mui/x-data-grid', () => {
  return {
    DataGrid: (props: any) => {
      // Render a simple div with the list of companies from rows
      const companies = (props.rows ?? []).map((r: any) => r.company).join(',');
      return (
        <div data-testid="data-grid">
          {companies}
        </div>
      );
    },
  };
});

// 🔹 Mock the API module
vi.mock('../api/drugApi', () => ({
  fetchDrugs: vi.fn(),
  fetchTableConfig: vi.fn(),
}));

import DrugTable from './DrugTable';
import { fetchDrugs, fetchTableConfig } from '../api/drugApi';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#004437',
      contrastText: '#ffffff',
    },
    background: {
      default: '#eef2f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#111111',
    },
  },
});

function renderWithTheme() {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DrugTable />
    </ThemeProvider>
  );
}

describe('DrugTable filtering by company', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // @ts-expect-error – we know these are mocked above
    (fetchTableConfig as vi.Mock).mockResolvedValue({
      data: [
        { key: 'id',         label: 'Id' },
        { key: 'code',       label: 'Code' },
        { key: 'name',       label: 'Name' },
        { key: 'company',    label: 'Company' },
        { key: 'launchDate', label: 'Launch Date' },
      ],
    });

    // @ts-expect-error – we know these are mocked above
    (fetchDrugs as vi.Mock).mockResolvedValue({
      data: [
        {
          _id: '1',
          code: 'AAA-111',
          genericName: 'Drug A',
          brandName: 'BRANDA',
          company: 'Company One',
          launchDate: '2024-01-01T00:00:00Z',
        },
        {
          _id: '2',
          code: 'BBB-222',
          genericName: 'Drug B',
          brandName: 'BRANDB',
          company: 'Company Two',
          launchDate: '2024-02-01T00:00:00Z',
        },
      ],
    });
  });

  it('shows all drugs by default and filters when a company is selected', async () => {
    const user = userEvent.setup();
    renderWithTheme();

    // Wait for initial data load and DataGrid render
    await waitFor(() => {
      const grid = screen.getByTestId('data-grid');
      // Initially should show both companies
      expect(grid.textContent).toContain('Company One');
      expect(grid.textContent).toContain('Company Two');
    });

    // Open the Autocomplete input
    const filterInput = screen.getByLabelText(/filter by company/i);
    await user.click(filterInput);

    // Click on "Company One" option
    await user.click(await screen.findByText('Company One'));

    // Now the grid should only contain "Company One"
    await waitFor(() => {
      const grid = screen.getByTestId('data-grid');
      expect(grid.textContent).toContain('Company One');
      expect(grid.textContent).not.toContain('Company Two');
    });
  });
});
