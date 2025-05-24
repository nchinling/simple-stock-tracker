import yahooFinance from "yahoo-finance2";

// Takes a list of stocks and returns a new list with current prices added
async function addStockListWithPrices(stocks) {
  try {
    const symbolsArray = stocks.map((stock) => stock.symbol);

    const prices = await yahooFinance.quote(symbolsArray);

    const priceMap = Array.isArray(prices)
      ? Object.fromEntries(prices.map((p) => [p.symbol, p.regularMarketPrice]))
      : { [prices.symbol]: prices.regularMarketPrice };

    const enrichedStocks = stocks.map((stock) => ({
      ...stock,
      currentPrice: priceMap[stock.symbol] || null,
    }));

    return enrichedStocks;
  } catch (error) {
    console.error("Yahoo Finance error:", error);
    throw new Error("Failed to fetch stock prices");
  }
}

export default addStockListWithPrices;
