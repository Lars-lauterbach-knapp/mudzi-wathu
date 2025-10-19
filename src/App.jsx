import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import Home from "./authpages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthCallback from "./components/AuthCallBack.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import AdminDashLayout from "./adminpages/AdminDashLayout.jsx";
import AdminHome from "./adminpages/AdminHome.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import RegistrationPage from "./RegistrationPage.jsx"; // Import AuthProvider

function App() {
  return (
      <AuthProvider> {/* Wrap Router with AuthProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegistrationPage/>}/>
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
              <Route path="/admindashboard" element={<AdminDashLayout />}>
                  <Route
                      index
                      element={
                          <AdminProtectedRoute>
                              <AdminHome />
                          </AdminProtectedRoute>
                      }
                  />
              </Route>
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;