import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import MarketResearch from './pages/modules/MarketResearch';
import WebsiteBuilder from './pages/modules/WebsiteBuilder';
import MarketingKit from './pages/modules/MarketingKit';
import FundingMatcher from './pages/modules/FundingMatcher';
import Deployments from './pages/modules/Deployments';
import MyProjects from './pages/MyProjects';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProjectProvider>
          <div className="noise-overlay" />
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<MyProjects />} />
                <Route path="research" element={<MarketResearch />} />
                <Route path="website" element={<WebsiteBuilder />} />
                <Route path="marketing" element={<MarketingKit />} />
                <Route path="funding" element={<FundingMatcher />} />
                <Route path="deployments" element={<Deployments />} />
              </Route>
            </Routes>
          </Router>
        </ProjectProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
