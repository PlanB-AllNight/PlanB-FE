import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './components/ScrollToTop';
import SimulationPage from './pages/SimulationPage';
import SimulationResultPage from './pages/SimulationResultPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/simulate" element={<SimulationPage />} />
        <Route path="/result" element={<SimulationResultPage />} />
      </Routes>
    </>
  );
}

export default App;