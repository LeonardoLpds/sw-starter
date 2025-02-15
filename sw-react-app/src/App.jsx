import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import PeopleDetail from './pages/PeopleDetail';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/people/:id" element={<PeopleDetail />} />
      </Route>
    </Routes>
  );
}
