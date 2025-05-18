import { AuthContext } from "../contexts/AuthContext";
import { StockContext } from "../contexts/StockContext";
import { useContext, useEffect } from "react";
import { fetchUserStocks } from "../service/db-service";
import Form from "./Form";
import StockList from "./StockList";
import "./styles/StockPage.css";

const StockPage = () => {
  const { user, logout } = useContext(AuthContext);
  const { setStockList } = useContext(StockContext);

  useEffect(() => {
    if (user?.email) {
      // Fetch user's stocks from backend
      fetchUserStocks(user.email)
        .then((data) => {
          if (data.success) {
            setStockList(data.stocks);
          } else {
            console.error("Failed to fetch stocks");
          }
        })
        .catch((err) => {
          console.error("Error fetching stocks:", err);
        });
    }
  }, [user?.email, setStockList]);

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <p>This is your dashboard.</p>

      <Form title="Enter a transaction" />
      <StockList title="My Stocks List" />
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default StockPage;
