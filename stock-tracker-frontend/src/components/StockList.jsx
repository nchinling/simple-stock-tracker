import { StockContext } from "../contexts/StockContext";
import { useContext, useState, useEffect } from "react";
import { deleteStock } from "../service/db-service";
import "./styles/StockList.css";
import TotalProfitOrLoss from "./TotalProfitOrLoss";

function StockList({ title }) {
  const { stocks, setStockList } = useContext(StockContext);
  const [totalProfitOrLoss, setTotalProfitOrLoss] = useState({});

  useEffect(() => {
    const calculateTotalPnL = () => {
      let totalProfit = 0;
      let totalCost = 0;
      stocks.forEach((stock) => {
        const { currentPrice, purchasePrice, quantity } = stock;
        if (currentPrice != null && purchasePrice != null && quantity != null) {
          totalProfit += (currentPrice - purchasePrice) * quantity;
          totalCost += purchasePrice * quantity;
        }
      });
      return {
        profitOrLoss: totalProfit,
        percentagePnL: (totalProfit / totalCost) * 100,
      };
    };

    const total = calculateTotalPnL();
    setTotalProfitOrLoss(total);
  }, [stocks]);

  const handleDelete = async (stockId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stock?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteStock(stockId);
      if (response.success) {
        // Remove from UI
        const updatedList = stocks.filter((stock) => stock.stockId !== stockId);
        setStockList(updatedList);
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert(`Error deleting stock. ${err}`);
    }
  };

  return (
    <div className="stock-list">
      <h2>{title}</h2>
      <TotalProfitOrLoss totalProfitOrLoss={totalProfitOrLoss} />
      {Array.isArray(stocks) && stocks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
              <th>Current Price</th>
              <th>P/L</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.quantity}</td>
                <td>{stock.purchasePrice}</td>
                <td>{stock.currentPrice}</td>
                {/* <td>placeholder</td> */}
                <td
                  style={{
                    color: stock.profitOrLoss >= 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {stock.profitOrLoss >= 0 ? "▲" : "▼"}
                  {" $"}
                  {Math.abs(stock.profitOrLoss).toFixed(2)}
                  {" ("}
                  {Math.abs(stock.percentagePnL).toFixed(2)}
                  {"%)"}
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(stock.stockId)}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stocks added yet</p>
      )}
    </div>
  );
}

export default StockList;
