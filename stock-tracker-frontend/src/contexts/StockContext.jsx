import { createContext, useState } from "react";

const StockContext = createContext();

const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  const setStockList = (stockList) => {
    setStocks(stockList);
  };

  return (
    <StockContext.Provider value={{ stocks, setStockList }}>
      {children}
    </StockContext.Provider>
  );
};

// const StockProvider = ({ children }) => {
//   const [stocks, setStocks] = useState([]);

//   return (
//     <StockContext.Provider value={{ stocks, setStocks }}>
//       {children}
//     </StockContext.Provider>
//   );
// };

export { StockContext, StockProvider };
