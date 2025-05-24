import { createContext, useState, useCallback } from "react";

const StockContext = createContext();

const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  // const setStockList = (stockList) => {
  //   setStocks(stockList);
  // };

  const setStockList = useCallback((stockList) => {
    setStocks(stockList);
  }, []);

  return (
    <StockContext.Provider value={{ stocks, setStockList }}>
      {children}
    </StockContext.Provider>
  );
};

export { StockContext, StockProvider };
