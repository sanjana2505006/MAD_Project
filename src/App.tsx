import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
