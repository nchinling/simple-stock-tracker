import { createContext, useState } from 'react';

const StockContext = createContext();

const StockProvider = ({ children }) => {
    const [stocks, setStocks] = useState([]);
  
    const addStock = (stock) => {
      setStocks((prevStocks) => [...prevStocks, stock]);
    };
  
    return (
      <StockContext.Provider value={{ stocks, addStock }}>
        {children}
      </StockContext.Provider>
    );
  };


export {StockContext, StockProvider};