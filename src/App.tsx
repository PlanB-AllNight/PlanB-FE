import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop';
import SimulationPage from './pages/SimulationPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/simulate" element={<SimulationPage />} />
      </Routes>
    </>
  );
}

export default App;