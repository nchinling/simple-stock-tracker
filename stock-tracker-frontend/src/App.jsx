import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StockProvider } from "./contexts/StockContext";
import TalkToServer from "./components/TalkToServer";
import LoginPage from "./components/LoginPage";
import StockPage from "./components/StockPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";

function App() {
  // const [count, setCount] = useState(0)
  const [user, setUser] = useState(null);

  return (
    <>
      <AuthProvider>
        <Router>
          <StockProvider>
            <Header title="Finance Dashboard" />
            <Routes>
              {/* Default route - Redirect to login if user is not authenticated */}
              <Route path="/" element={<LoginPage />} />
              {/* <Route path="/dashboard" element={<StockPage />} /> */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <StockPage />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <TalkToServer />
            {/* <Form />
          <StockList title="My List" /> */}
            <Footer name="ChinLing" />
          </StockProvider>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
