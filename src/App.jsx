import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import Home from "./authpages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthCallback from "./components/AuthCallBack.jsx";
import AuthProvider from "./providers/AuthProvider.jsx"; // Import AuthProvider

function App() {
  return (
      <AuthProvider> {/* Wrap Router with AuthProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;