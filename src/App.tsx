import "./App.css";
import LoginPage from "./components/auth/Login.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import { BrowserRouter, Routes, Route,  } from "react-router";
import ProtectedRoute from "./components/common/ProtectedRoute.js";

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" index element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
