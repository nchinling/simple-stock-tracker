// Activity 4: Calculate and display total PnL
// TotalProfitOrLoss.jsx;
// function TotalProfitOrLoss({ totalProfitOrLoss }) {
//   return (
//     <header>
//       <p>Percentage: {totalProfitOrLoss.percentagePnL?.toFixed(2)}%</p>
//       <p>Profit or Loss: ${totalProfitOrLoss.profitOrLoss?.toFixed(2)}</p>
//     </header>
//   );
// }

// export default TotalProfitOrLoss;

// StockList.jsx

// 1.
// const [totalProfitOrLoss, setTotalProfitOrLoss] = useState({});

// 2.
//   useEffect(() => {
//     const calculateTotalPnL = () => {
//       let total = 0;
//       let totalCost = 0;
//       stocks.forEach((stock) => {
//         const { currentPrice, purchasePrice, quantity } = stock;
//         if (currentPrice != null && purchasePrice != null && quantity != null) {
//           total += (currentPrice - purchasePrice) * quantity;
//           totalCost += purchasePrice * quantity;
//         }
//       });
//       return {
//         profitOrLoss: total,
//         percentagePnL: totalCost ? (total / totalCost) * 100 : 0,
//       };
//     };

//     const total = calculateTotalPnL();
//     setTotalProfitOrLoss(total);
//   }, [stocks]);

// 3.
{
  /* <TotalProfitOrLoss totalProfitOrLoss={totalProfitOrLoss} /> */
}
