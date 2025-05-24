function calculatePnL(stocks) {
  return stocks.map((stock) => {
    // destructure
    const { currentPrice, purchasePrice, quantity } = stock;

    const profitOrLoss =
      currentPrice != null && purchasePrice != null && quantity != null
        ? (currentPrice - purchasePrice) * quantity
        : null;

    // Consider doing percentage
    const percentagePnL = (profitOrLoss / (purchasePrice * quantity)) * 100;

    return {
      ...stock, // use all properties from stock. Recall: symbol, quantity, purchase price, current price
      profitOrLoss,
      percentagePnL,
    };
  });
}

export default calculatePnL;
