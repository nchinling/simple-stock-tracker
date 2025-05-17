import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NewUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //   const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (user && !name) {
  //       logout(); // Log out if a user exists
  //     }
  //   }, [user, name]);

  const handleCreate = () => {
    if (name.trim() && email.trim()) {
      //   login(name);
      navigate("/dashboard"); // Redirect after login
    }
  };

  return (
    <div>
      <h2>Create new user</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default NewUserPage;
