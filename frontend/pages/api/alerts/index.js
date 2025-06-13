// Mock alerts data endpoint as a Next.js API route
export default function handler(req, res) {
  const alerts = [
    {
      id: "alert_001",
      type: "info",
      message: "Campaign 'Summer Wellness Promotion' is performing well with 3.1 ROAS",
      timestamp: "2025-06-12T12:30:45Z",
      read: false
    },
    {
      id: "alert_002",
      type: "warning",
      message: "Inventory for 'Premium Wellness Package' is running low (15 units remaining)",
      timestamp: "2025-06-12T10:15:22Z",
      read: true
    },
    {
      id: "alert_003",
      type: "success",
      message: "New product 'Luxury Self-Care Kit' has exceeded sales targets by 25%",
      timestamp: "2025-06-11T16:45:12Z",
      read: false
    }
  ];
  
  res.status(200).json({ alerts });
}
