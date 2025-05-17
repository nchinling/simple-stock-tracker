import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/db-service";
import { AuthContext } from "../contexts/AuthContext";
import "./styles/NewUser.css";

const NewUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!name.trim() || !email.trim()) {
      setError("Both fields are required.");
      return;
    }

    try {
      const data = await registerUser(name, email);

      if (data.success) {
        console.log("User registered successfully!");
        // Save user in authentication context
        login({ name, email });
        navigate("/dashboard"); // Redirect to dashboard on success
      } else {
        setError("Email already exists.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="new-user-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default NewUser;
