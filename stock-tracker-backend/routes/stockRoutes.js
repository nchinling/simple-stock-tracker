import express from "express";
const router = express.Router();

import dbconn from "../config/db.js";
import addStockListWithPrices from "../services/addStockPrices.js";

// Fetch stocks
router.post("/", (req, res) => {
  const { id } = req.body;
  const user_id = id;

  const query = `
      SELECT s.id AS stockId, s.symbol, t.quantity, t.purchase_price AS purchasePrice
      FROM stocks s
      JOIN transactions t ON s.id = t.stock_id
      WHERE s.user_id = ?`;

  dbconn.query(query, [user_id], async (err, stocks) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch stocks" });
    }

    // res.json({ success: true, stocks });

    // retrieve stock prices
    try {
      const enrichedStocks = await addStockListWithPrices(stocks);
      res.json({ success: true, stocks: enrichedStocks });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch stock prices",
      });
    }
  });
});

// Add stock
router.post("/new", (req, res) => {
  const { id, symbol, quantity, purchasePrice } = req.body;
  const user_id = id;

  dbconn.query(
    "INSERT INTO stocks (user_id, symbol) VALUES (?, ?)",
    [user_id, symbol],
    (err, stockResult) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error inserting stock" });
      }

      const stockId = stockResult.insertId;

      dbconn.query(
        "INSERT INTO transactions (stock_id, quantity, purchase_price) VALUES (?, ?, ?)",
        [stockId, quantity, purchasePrice],
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Error inserting transaction",
            });
          }

          dbconn.query(
            `SELECT s.symbol, t.quantity, t.purchase_price AS purchasePrice
                 FROM stocks s
                 JOIN transactions t ON s.id = t.stock_id
                 WHERE s.user_id = ?`,
            [user_id],
            (err, stockRows) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: "Error fetching stocks",
                });
              }
              res.json({ success: true, stocks: stockRows });
            }
          );
        }
      );
    }
  );
});

// Delete stock
router.delete("/:stockId", (req, res) => {
  const stockId = req.params.stockId;

  console.log(`Stock id is ${stockId}`);
  dbconn.query(
    "DELETE FROM transactions WHERE stock_id = ?",
    [stockId],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to delete transaction(s)" });
      }

      // Check if there is anymore transactions with same stock_id
      dbconn.query(
        "SELECT * FROM transactions WHERE stock_id = ?",
        [stockId],
        (err, remainingTransactions) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Error checking remaining transactions",
            });
          }

          // if none, delete stock from stocks table.
          if (remainingTransactions.length === 0) {
            dbconn.query(
              "DELETE FROM stocks WHERE id = ?",
              [stockId],
              (err) => {
                if (err) {
                  return res.status(500).json({
                    success: false,
                    message: "Failed to delete stock",
                  });
                }
                return res.json({
                  success: true,
                  message: "Transaction and stock deleted",
                });
              }
            );
          } else {
            return res.json({
              success: true,
              message: "Transaction(s) deleted, stock retained",
            });
          }
        }
      );
    }
  );
});

export default router;
