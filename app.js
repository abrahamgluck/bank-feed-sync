const express = require('express');
const axios = require('axios');
const app = express();

// Route for testing Finicity token
app.get('/test-token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.finicity.com/aggregation/v2/partners/authentication',
      null,
      {
        headers: {
          'Finicity-App-Key': process.env.FINICITY_APP_KEY,
          'Content-Type': 'application/json',
        },
        auth: {
          username: process.env.FINICITY_PARTNER_ID,
          password: process.env.FINICITY_PARTNER_SECRET,
        },
      }
    );

    console.log('✅ Access Token:', response.data.token);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Token Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get token' });
  }
});

// Export the app
module.exports = app;
