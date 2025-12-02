import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridCellParams, type GridColDef } from '@mui/x-data-grid';
import { fetchDrugs, fetchTableConfig } from '../api/drugApi';
import { Autocomplete, useTheme } from '@mui/material';

type Drug = {
  _id?: string;
  code: string;
  genericName: string;
  brandName: string;
  company: string;
  launchDate: string;
};

type ColumnConfig = {
  key: string;
  label: string;
};

export default function DrugTable() {
  const theme = useTheme();
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const [drugsRes, configRes] = await Promise.all([
          fetchDrugs(),
          fetchTableConfig(),
        ]);

        const drugsData = (drugsRes as any).data ?? drugsRes;
        const configData = (configRes as any).data ?? configRes;

        setDrugs(drugsData);
        setColumnConfig(configData);
      } catch (err) {
        console.error('Error loading drug data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const companies = useMemo(
    () =>
      Array.from(new Set(drugs.map((d) => d.company)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [drugs]
  );

  const filteredDrugs = useMemo(
    () =>
      selectedCompany
        ? drugs.filter((d) => d.company === selectedCompany)
        : drugs,
    [drugs, selectedCompany]
  );

  const gridRows = useMemo(
    () =>
      filteredDrugs.map((drug, index) => ({
        id: drug._id ?? index + 1,
        ...drug,
      })),
    [filteredDrugs]
  );

  const gridColumns: GridColDef[] = useMemo(
    () =>
      columnConfig.map((col): GridColDef => {
        switch (col.key) {
          case 'id':
            return {
              field: 'id',
              headerName: col.label,
              width: 80,
            };

          case 'code':
            return {
              field: 'code',
              headerName: col.label,
              flex: 1,
              minWidth: 140,
            };

          case 'name':
            return {
              field: 'name',
              headerName: col.label,
              flex: 2,
              minWidth: 220,
              valueGetter: (_value, row) =>
                `${(row as Drug).genericName} (${(row as Drug).brandName})`,
            };

          case 'company':
            return {
              field: 'company',
              headerName: col.label,
              flex: 2,
              minWidth: 220,
            };

          case 'launchDate':
            return {
              field: 'launchDate',
              headerName: col.label,
              flex: 1,
              minWidth: 140,
              valueGetter: (_value, row) => {
                const raw = (row as Drug).launchDate;
                const date = raw ? new Date(raw) : null;
                return date ? date.toLocaleDateString() : '';
              },
              sortable: true,
            };

          default:
            return {
              field: col.key,
              headerName: col.label,
              flex: 1,
            };
        }
      }),
    [columnConfig]
  );

  if (loading) return <div>Loading drug data…</div>;
  if (error) return <div>{error}</div>;

  const handleCellClick = (params: GridCellParams) => {
  if (params.field !== 'company') return;

  const company = params.value as string | null;
  if (!company) return;

  // clear filter if same company is clicked again
  setSelectedCompany((prev) => (prev === company ? '' : company));
};

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: theme.palette.primary.main,
        borderRadius: 1.5,
        overflow: 'hidden',
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Green header bar with title only */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          height: 56,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Drug List
        </Typography>
      </Box>

      {/* Content area (filter + grid) */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          bgcolor: theme.palette.background.paper,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          pt: 1.5,
        }}
      >
        {/* Filter by company just below "Drug List" */}
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            height: 40, // fixed height for filter row
            alignItems: 'center',
          }}
        >
          <Autocomplete
            size="small"
            options={companies}
            value={selectedCompany}
            onChange={(_e, newValue) => setSelectedCompany(newValue ?? '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by company"
                sx={{ minWidth: 260 }}
              />
            )}
            sx={{ minWidth: 260 }}
          />
        </Box>

        {/* DataGrid fills all remaining vertical space and scrolls */}
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          <DataGrid
            rows={gridRows}
            columns={gridColumns}
            initialState={{
              pagination: { paginationModel: { pageSize: 100 } },
            }}
            pageSizeOptions={[10, 200, 50, 100]}
            disableRowSelectionOnClick
            autoHeight={false}
            onCellClick={handleCellClick}
            sx={{
              border: 0,
              height: '100%',
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.text.primary,
                fontWeight: 600,
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                bgcolor: theme.palette.action.hover,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
);

}
