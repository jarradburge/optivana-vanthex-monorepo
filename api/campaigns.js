// Mock campaigns data endpoint as a Vercel serverless function
module.exports = (req, res) => {
  const campaigns = [
    {
      id: "camp_001",
      name: "Summer Wellness Promotion",
      status: "active",
      budget: 1000,
      spent: 450,
      roas: 2.8,
      conversions: 85,
      startDate: "2025-05-15",
      endDate: "2025-07-15"
    },
    {
      id: "camp_002",
      name: "New Product Launch",
      status: "scheduled",
      budget: 2000,
      spent: 0,
      roas: 0,
      conversions: 0,
      startDate: "2025-07-01",
      endDate: "2025-08-15"
    },
    {
      id: "camp_003",
      name: "Holiday Special",
      status: "draft",
      budget: 1500,
      spent: 0,
      roas: 0,
      conversions: 0,
      startDate: "2025-11-15",
      endDate: "2025-12-31"
    }
  ];
  
  res.status(200).json({ campaigns });
};
