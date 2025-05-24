import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import NewUser from "./NewUser";
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
      logout(); // Log out if a user is logged in
    }
  }, [user, name, logout]);

  const handleLogin = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Both fields are required.");
      return;
    }

    try {
      const data = await authenticateLogin(name, email);
      if (data.success) {
        const id = data.user.id;
        login({ id, name, email });
        console.log("Navigating to /dashboard");

        navigate("/dashboard");
      } else {
        // "Invalid username or email" message received from backend
        setError(data.message);
      }
    } catch (err) {
      setError(`Error logging in. Please try again later. ${err}`);
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
      <p>
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
