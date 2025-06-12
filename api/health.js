// Health check endpoint as a Vercel serverless function
module.exports = (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Optivana API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
};
