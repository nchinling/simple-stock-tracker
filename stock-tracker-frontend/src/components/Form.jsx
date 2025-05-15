import React, { useState, useContext } from 'react';
import { getLatestClosingPrice } from '../service/api-service';
import { StockContext } from '../contexts/StockContext';
import './styles/Form.css'

function Form() {
  const [symbol, setSymbol] = useState(''); // Store stock symbol
  const [closingPrice, setClosingPrice] = useState(null); // Store closing price
  const [quantity, setQuantity] = useState(''); // store quantity
  const [purchasePrice, setPurchasePrice] = useState(''); // Store purchase price
  const [error, setError] = useState(null); // Store error messages
  const { addStock } = useContext(StockContext);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null); 

    try {
      const data = await getLatestClosingPrice(symbol);
      const newStock = {
        symbol,
        quantity,
        purchasePrice,
        currentPrice: data.closing_price,
      };

      //reset form fields
      addStock(newStock);
      setSymbol('');
      setQuantity('');
      setPurchasePrice('');
    } catch (err) {
      setError('Error fetching data. Please try again.');
    }
  };

    return (
      <>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Stock Symbol" name="stockSymbol" value={symbol}
              onChange={(event)=>setSymbol(event.target.value)} required />
          </label>
    
          <label>
            <input type="text" placeholder="Quantity" name="quantity" value={quantity}
              onChange={(event)=>setQuantity(event.target.value)} required />
          </label>
    
          <label>
            <input type="text" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} 
              onChange={(event)=>setPurchasePrice(event.target.value)} required />
          </label>
    
          <button type="submit">Add Stock</button>
        </form>

{/* Display price */}
          {closingPrice !== null && (
          <div>
            <h2>Latest Closing Price for {symbol.toUpperCase()}</h2>
            <p>${closingPrice}</p>
          </div>
        )}
      </>
      );
    }


export default Form;


