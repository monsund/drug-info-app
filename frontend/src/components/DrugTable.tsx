import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridCellParams, type GridColDef } from '@mui/x-data-grid';
import { fetchDrugs, fetchTableConfig } from '../api/drugApi';
import { Autocomplete, CircularProgress, useTheme } from '@mui/material';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [drugsRes, configRes] = await Promise.all([
          fetchDrugs(),
          fetchTableConfig(),
        ]);
        console.log('Fetched drugs:', drugsRes);
        const drugsData = Array.isArray(drugsRes) ? drugsRes : [];
        const configData = Array.isArray((configRes as any)) ? (configRes as any) : [];
        
        setDrugs(drugsData);
        setColumnConfig(configData);
      } catch (error) {
        console.error('Error loading drug data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const companies = useMemo(
    () =>
      Array.from(new Set(drugs?.map((d) => d?.company)))
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
              sortable: false,
            };

          case 'code':
            return {
              field: 'code',
              headerName: col.label,
              flex: 1,
              minWidth: 140,
              sortable: false,
            };

          case 'name':
            return {
              field: 'name',
              headerName: col.label,
              flex: 2,
              minWidth: 220,
              valueGetter: (_value, row) =>
                `${(row as Drug).genericName} (${(row as Drug).brandName})`,
              sortable: false,
            };

          case 'company':
            return {
              field: 'company',
              headerName: col.label,
              flex: 2,
              minWidth: 220,
              sortable: false,
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
              sortable: false,
            };

          default:
            return {
              field: col.key,
              headerName: col.label,
              flex: 1,
              sortable: false,
            };
        }
      }),
    [columnConfig]
  );

  const handleCellClick = (params: GridCellParams) => {
    if (params.field !== 'company') return;

    const company = params.value as string | null;
    if (!company) return;

    // clear filter if same company is clicked again
    setSelectedCompany((prev) => (prev === company ? '' : company));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        borderRadius: 1.5,
        overflow: 'hidden',
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          height: 50,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Drug List
        </Typography>
      </Box>

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
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 40,
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

        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          <DataGrid
            rows={gridRows}
            columns={gridColumns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            onCellClick={handleCellClick}
            sx={{
              height: '100%',
              border: 0,
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#000202ff',
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
