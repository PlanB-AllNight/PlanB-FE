import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './components/ScrollToTop';
import SimulationPage from './pages/SimulationPage';
import MyPage from "./pages/MyPage";
import SimulationResultPage from './pages/SimulationResultPage';
import BudgetPage from "./pages/BudgetPage";
import AnalysisPage from "./pages/AnalysisPage";
import AnalysisStartPage from "./pages/AnalysisStartPage";

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
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/result" element={<SimulationResultPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/analysis/result" element={<AnalysisPage />} />
        <Route path="/analysis" element={<AnalysisStartPage />} />
      </Routes>
    </>
  );
}

export default App;