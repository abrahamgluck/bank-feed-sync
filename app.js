const axios = require('axios');

app.get('/test-token', async (req, res) => {
  try {
    // 👇 This will print your env vars to the console/logs
    console.log('🔍 ENV Vars:', {
      FINICITY_PARTNER_ID: process.env.FINICITY_PARTNER_ID,
      FINICITY_PARTNER_SECRET: process.env.FINICITY_PARTNER_SECRET,
      FINICITY_APP_KEY: process.env.FINICITY_APP_KEY
    });

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

    console.log('✅ Access Token:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Token Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get token' });
  }
});
