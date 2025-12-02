// App.tsx
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import DrugTable from './components/DrugTable';

export default function App() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        p: 3,
      }}
    >
      {/* This wrapper gives the table a fixed height */}
      <Box
          sx={{
            height: 'calc(100vh - 2 * 24)', // full viewport minus top/bottom padding
          }}
        >
        <DrugTable />
      </Box>
    </Box>
  );
}
