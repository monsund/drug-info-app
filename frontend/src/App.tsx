import Box from '@mui/material/Box';
import DrugTable from './components/DrugTable';

function App() {

  return (
    <Box sx={{ minHeight: '100vh', p: 3 }}>
      <Box sx={{ height: 'calc(100vh - 48px)' }}>
        <DrugTable />
      </Box>
    </Box>
  )
}

export default App
