import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './components/Header/Header';
import HouseDetails from './components/HouseDetails/HouseDetails';
import HouseListPage from './components/HouseListPage/HouseListPage';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={< HouseListPage />} />
        <Route path="/house-details" element={<HouseDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
