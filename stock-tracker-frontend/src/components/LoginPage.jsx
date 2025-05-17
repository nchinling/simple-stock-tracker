import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NewUserPage from "./NewUserPage";
import "./styles/LoginPage.css";
import { authenticateLogin } from "../service/db-service";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !name) {
      logout(); // Only log out if a user exists
    }
  }, [user, name]);

  const handleLogin = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Both fields are required.");
      return;
    }

    try {
      const data = await authenticateLogin(name, email);

      if (data.success) {
        login({ name, email });
        console.log("Navigating to /dashboard");

        navigate("/dashboard");
      } else {
        setError("Invalid username or email.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <input
        type="text"
        placeholder="Enter your username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
      {/* <NewUserPage /> */}
    </div>
  );
};

export default LoginPage;
