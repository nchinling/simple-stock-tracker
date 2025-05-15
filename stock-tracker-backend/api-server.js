// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors()); 
const PORT = 5000;
const APIKEY = process.env.APIKEY;

app.get('/', async (req, res) => {
    res.send('Hello user! You need to access /api/data');
  });


app.get('/api/communicate', async (req, res) => {
    res.send('Hello user! You have communicated with the server');
});


app.get('/api/data', async (req, res) => {
    const symbol = req.query.symbol || 'IBM';
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${APIKEY}`
      );
  
      const timeSeries = response.data['Time Series (Daily)'];
      const dates = Object.keys(timeSeries);
      const latestDate = dates[0];
      const latestClose = timeSeries[latestDate]['4. close'];
  
      res.json({
        symbol,
        date: latestDate,
        closing_price: latestClose
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch or process data' });
    }
  });


// Below gets all time series data

// app.get('/api/data', async (req, res) => {
//   try {
//     const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${APIKEY}`);
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
