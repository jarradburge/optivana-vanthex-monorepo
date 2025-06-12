// System status endpoint as a Vercel serverless function
module.exports = (req, res) => {
  const systemStatus = {
    status: 'operational',
    version: '1.0.0',
    services: {
      api: 'online',
      database: 'online',
      vanthexEngine: 'online'
    },
    metrics: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    },
    timestamp: new Date().toISOString()
  };
  
  res.status(200).json(systemStatus);
};
