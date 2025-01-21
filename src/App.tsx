import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import MovieSearchContainer from './components/MovieSearchContainer/MovieSearchContainer';
import FavoritesView from './components/FavoritesView/FavoritesView';
import { CssBaseline } from '@mui/material';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<MovieSearchContainer />} />
        <Route path="/favorites" element={<FavoritesView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
