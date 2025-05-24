// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const dbconn = require("../config/db");

router.post("/login", (req, res) => {
  const { name, email } = req.body;

  dbconn.query(
    "SELECT * FROM users WHERE name = ? AND email = ?",
    [name, email],
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      if (results.length > 0) {
        console.log(results[0]);
        return res.json({ success: true, user: results[0] });
      }
      res.json({ success: false, message: "Invalid username or email" });
    }
  );
});

// router.post("/register", (req, res) => {
//   const { name, email } = req.body;

//   dbconn.query(
//     "INSERT INTO users (name, email) VALUES (?, ?)",
//     [name, email],
//     (err) => {
//       if (err) {
//         if (err.code === "ER_DUP_ENTRY") {
//           return res
//             .status(409)
//             .json({ success: false, message: "Email already exists." });
//         }
//         return res
//           .status(500)
//           .json({ success: false, message: "Database error." });
//       }
//       res.json({ success: true, message: "User registered successfully" });
//     }
//   );
// });

router.post("/register", (req, res) => {
  const { name, email } = req.body;

  dbconn.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ success: false, message: "Email already exists." });
        }
        return res
          .status(500)
          .json({ success: false, message: "Database error." });
      }

      // Retrieve and return the newly inserted user
      dbconn.query(
        "SELECT * FROM users WHERE id = ?",
        [result.insertId],
        (err, userResult) => {
          if (err) {
            return res
              .status(500)
              .json({ success: false, message: "Error fetching user data." });
          }
          res.json({
            success: true,
            message: "User registered successfully",
            user: userResult[0],
          });
        }
      );
    }
  );
});

module.exports = router;
