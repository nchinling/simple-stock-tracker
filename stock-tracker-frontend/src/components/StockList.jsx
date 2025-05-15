import { StockContext } from "../contexts/StockContext";
import { useContext } from "react";

function StockList({ title }) {
  const { stocks } = useContext(StockContext);

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
