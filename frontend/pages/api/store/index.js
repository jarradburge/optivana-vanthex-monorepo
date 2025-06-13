// Mock store data endpoint as a Next.js API route
export default function handler(req, res) {
  const store = {
    id: "store_001",
    name: "Luxury Lifestyle Store",
    status: "Active",
    revenue: 12580,
    orders: 142,
    conversionRate: 3.2,
    traffic: 4500,
    products: 24,
    createdAt: "2025-01-15",
    updatedAt: "2025-06-12"
  };
  
  res.status(200).json({ store });
}
