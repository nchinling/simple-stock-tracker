import { StockContext } from "../contexts/StockContext";
import { useContext } from "react";
import { deleteStock } from "../service/db-service";
import "./styles/StockList.css";

function StockList({ title }) {
  const { stocks, setStockList } = useContext(StockContext);

  //add delete function
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
      alert("Error deleting stock.");
    }
  };

  return (
    <div className="stock-list">
      <h2>{title}</h2>
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
                <td>Placeholder</td>
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
