// Mock products data endpoint as a Vercel serverless function
module.exports = (req, res) => {
  const products = [
    {
      id: "prod_001",
      name: "Premium Wellness Package",
      price: 199.99,
      category: "Wellness",
      status: "active",
      inventory: 50,
      sales: 28,
      rating: 4.8
    },
    {
      id: "prod_002",
      name: "Luxury Self-Care Kit",
      price: 149.99,
      category: "Self-Care",
      status: "active",
      inventory: 35,
      sales: 42,
      rating: 4.9
    },
    {
      id: "prod_003",
      name: "Exclusive Membership",
      price: 299.99,
      category: "Membership",
      status: "active",
      inventory: 100,
      sales: 15,
      rating: 4.7
    }
  ];
  
  res.status(200).json({ products });
};
