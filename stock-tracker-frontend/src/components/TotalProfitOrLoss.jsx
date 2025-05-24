function TotalProfitOrLoss({ totalProfitOrLoss }) {
  return (
    <header>
      {/* <p>Percentage: {totalProfitOrLoss.percentagePnL?.toFixed(2)}%</p>
      <p>Profit or Loss: ${totalProfitOrLoss.profitOrLoss?.toFixed(2)}</p> */}
      <p
        style={{
          color: totalProfitOrLoss.profitOrLoss >= 0 ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {" "}
        {totalProfitOrLoss.profitOrLoss >= 0 ? "▲" : "▼"}
        {" $"}
        {Math.abs(totalProfitOrLoss.profitOrLoss).toFixed(2)}
        {" ("}
        {Math.abs(totalProfitOrLoss.percentagePnL).toFixed(2)}
        {"%)"}
      </p>
    </header>
  );
}

export default TotalProfitOrLoss;
