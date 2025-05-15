import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Form from "./Form";
import StockList from "./StockList";

const StockPage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <p>This is your finance dashboard.</p>

      <h2>My Stocks</h2>
      <Form />
      <StockList title="My List" />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default StockPage;
