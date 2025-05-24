import React, { useState, useContext } from "react";
import { addStockTransaction, fetchUserStocks } from "../service/db-service";
import { AuthContext } from "../contexts/AuthContext";
import { StockContext } from "../contexts/StockContext";
import "./styles/Form.css";

function Form({ title }) {
  const { user } = useContext(AuthContext);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { setStockList } = useContext(StockContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const id = user.id;

      // wait for completion
      await addStockTransaction(id, symbol, quantity, purchasePrice);

      const updatedStockList = await fetchUserStocks(user.id);
      if (updatedStockList.success) {
        setSuccessMessage("Stock transaction list fetched successfully");
        setStockList(updatedStockList.stocks);
      }

      setSymbol("");
      setQuantity("");
      setPurchasePrice("");
    } catch (err) {
      setError(`Error submitting transaction. Please try again. ${err}`);
    }
  };

  return (
    <>
      <h2 className="form-header">{title}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Stock Symbol"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="number"
            step="0.01"
            placeholder="Purchase Price"
            value={purchasePrice}
            onChange={(event) => setPurchasePrice(event.target.value)}
            required
          />
        </label>

        <button type="submit">Add Stock</button>
      </form>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </>
  );
}

export default Form;
