import React, { useState, useContext } from "react";
import { addStockTransaction } from "../service/db-service";
import { AuthContext } from "../contexts/AuthContext";
import { StockContext } from "../contexts/StockContext";
import "./styles/Form.css";

function Form() {
  const { user } = useContext(AuthContext); // Access user from context
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
      const email = user.email; // from AuthContext

      const response = await addStockTransaction(
        email,
        symbol,
        quantity,
        purchasePrice
      );

      if (response.success) {
        setSuccessMessage("Stock transaction added successfully!");
        setStockList(response.stocks); // update the stock list context here
      }

      setSymbol("");
      setQuantity("");
      setPurchasePrice("");
    } catch (err) {
      setError("Error submitting transaction. Please try again.");
    }
  };

  return (
    <>
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
