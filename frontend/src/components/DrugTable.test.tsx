/// <reference types="vitest/globals" />

import { vi, type Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

// -----------------------------------------------------------------------------
// Mock: DataGrid (lightweight + triggers onCellClick)
// -----------------------------------------------------------------------------
vi.mock('@mui/x-data-grid', () => ({
  DataGrid: ({ rows = [], onCellClick }: any) => (
    <div data-testid="data-grid">
      <div data-testid="grid-companies">
        {rows.map((r: any) => r.company).join(',')}
      </div>

      {/* Simple clickable mock cells */}
      {rows.map((row: any, i: number) => (
        <div key={row.id ?? i}>
          <button
            data-testid={`cell-company-${i}`}
            onClick={() =>
              onCellClick?.({ field: 'company', value: row.company } as any)
            }
          >
            {row.company}
          </button>

          <button
            data-testid={`cell-code-${i}`}
            onClick={() =>
              onCellClick?.({ field: 'code', value: row.code } as any)
            }
          >
            {row.code}
          </button>
        </div>
      ))}
    </div>
  ),
}));

// -----------------------------------------------------------------------------
// Mock: Autocomplete → simplified <select>
// -----------------------------------------------------------------------------
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<typeof import('@mui/material')>('@mui/material');

  return {
    ...actual,
    Autocomplete: ({ options, value, onChange, renderInput }: any) => (
      <div>
        {renderInput({ inputProps: {} } as any)}

        <select
          data-testid="company-filter"
          value={value}
          onChange={(e) => onChange?.(null, e.target.value || null)}
        >
          <option value="">All companies</option>
          {options.map((o: string) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    ),
  };
});

// -----------------------------------------------------------------------------
// Mock API
// -----------------------------------------------------------------------------
vi.mock('../api/drugApi', () => ({
  fetchDrugs: vi.fn(),
  fetchTableConfig: vi.fn(),
}));

import DrugTable from './DrugTable';
import { fetchDrugs, fetchTableConfig } from '../api/drugApi';

// -----------------------------------------------------------------------------
// Theme wrapper
// -----------------------------------------------------------------------------
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#004437', contrastText: '#fff' },
    background: { default: '#eef2f5', paper: '#fff' },
    text: { primary: '#111' },
  },
});

const renderWithTheme = () =>
  render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DrugTable />
    </ThemeProvider>
  );

// -----------------------------------------------------------------------------
// Shared helpers
// -----------------------------------------------------------------------------
const waitForInitialData = async () => {
  await waitFor(() => {
    const grid = screen.getByTestId('data-grid');
    expect(grid.textContent).toContain('Company One');
    expect(grid.textContent).toContain('Company Two');
  });
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------
describe('DrugTable filtering', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    (fetchTableConfig as Mock).mockResolvedValue([
      { key: 'id', label: 'Id' },
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Name' },
      { key: 'company', label: 'Company' },
      { key: 'launchDate', label: 'Launch Date' },
    ]);

    (fetchDrugs as Mock).mockResolvedValue([
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
    ]);
  });

  // ---------------------------------------------------------------------------
  // Autocomplete filtering
  // ---------------------------------------------------------------------------
  it('filters via Autocomplete select', async () => {
    const user = userEvent.setup();
    renderWithTheme();

    await waitForInitialData();

    const select = screen.getByTestId('company-filter');
    await user.selectOptions(select, 'Company One');

    await waitFor(() => {
      const grid = screen.getByTestId('grid-companies');
      expect(grid.textContent).toContain('Company One');
      expect(grid.textContent).not.toContain('Company Two');
    });
  });

  // ---------------------------------------------------------------------------
  // onCellClick filtering
  // ---------------------------------------------------------------------------
  it('filters rows when clicking a company cell', async () => {
    const user = userEvent.setup();
    renderWithTheme();

    await waitForInitialData();

    await user.click(screen.getByTestId('cell-company-0'));

    await waitFor(() => {
      const grid = screen.getByTestId('grid-companies');
      expect(grid.textContent).toContain('Company One');
      expect(grid.textContent).not.toContain('Company Two');
    });
  });

  it('toggles filter off when clicking the same company cell again', async () => {
    const user = userEvent.setup();
    renderWithTheme();

    await waitForInitialData();

    const cell = screen.getByTestId('cell-company-0');
    await user.click(cell); // apply filter
    await user.click(cell); // remove filter

    await waitFor(() => {
      const grid = screen.getByTestId('grid-companies');
      expect(grid.textContent).toContain('Company One');
      expect(grid.textContent).toContain('Company Two');
    });
  });
});
