// Example of how to use the simulated API in your application

import { apiRequest } from "./init.js"; // Import the apiRequest function

// Example: Fetch products with pagination
async function getProductsList() {
  try {
    const response = await apiRequest("/api/products", "GET", {
      page: 1,
      limit: 5,
      search: "iPhone",
    });

    console.log("Products:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

// Example: Add a new product
async function addNewProduct() {
  const newProduct = {
    name: "Nothing Phone (2a) 256GB",
    price: "12000000",
    creditPrice: "12080000",
    costPrice: "10500000",
    quantity: 45,
    brand: "Nothing",
    category: "Smartphone tầm trung",
    image: "images/nothing-phone2a.jpg",
    status: "inStock",
    stockQuantity: 45,
    importPrice: "10500000",
    sellingPrice: "12000000",
    productGroup: "Điện thoại",
    trademark: "Nothing",
    position: "",
    unit: "chiếc",
    weight: "0 g",
  };

  try {
    const response = await apiRequest("/api/products", "POST", newProduct);
    console.log("New product added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
}

// Example: Create a new order
async function createOrder() {
  const order = {
    customer: {
      id: "KH000001",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "kh1@gmail.com",
      address: "123 Đường ABC, Quận 1, TP.HCM",
    },
    items: [
      {
        id: "SP000082",
        name: "iPhone 16 Pro Max 256GB | Chính hãng VN/A",
        price: "29000000",
        quantity: 1,
        priceType: "price",
      },
      {
        id: "SP000083",
        name: "Samsung Galaxy S24 Ultra 512GB",
        price: "28000000",
        quantity: 1,
        priceType: "price",
      },
    ],
    subtotal: 57000000,
    discountPercent: 5,
    discountAmount: 2850000,
    priceReduction: 0,
    total: 54150000,
    paymentMethod: "cash",
    priceType: "price",
  };

  try {
    const response = await apiRequest("/api/orders", "POST", order);
    console.log("Order created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}

// Example: Get dashboard statistics
async function fetchDashboardStats() {
  try {
    const response = await apiRequest("/api/dashboard/stats", "GET");
    console.log("Dashboard stats:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return null;
  }
}

// Example: Login
async function login(email, password) {
  try {
    const response = await apiRequest("/api/auth/login", "POST", {
      email,
      password,
    });
    if (response.error) {
      console.error("Login failed:", response.error);
      return null;
    }

    console.log("Login successful:", response.data);
    // Store token in localStorage for authentication
    localStorage.setItem("authToken", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}

// Example of a complete flow
async function demonstrateCompleteFlow() {
  // 1. Login
  await login("nv@gmail.com", "password");

  // 2. Fetch product list
  const products = await getProductsList();

  // 3. Add a new product
  const newProduct = await addNewProduct();

  // 4. Create an order
  const order = await createOrder();

  // 5. Check updated inventory and stats
  const stats = await fetchDashboardStats();

  // 6. Fetch inventory report
  const inventoryReport = await apiRequest("/api/reports/inventory", "GET");
  console.log("Inventory report:", inventoryReport.data);

  console.log("Complete flow demonstration finished!");
}

// Run the demonstration
// demonstrateCompleteFlow();

export {
  getProductsList,
  addNewProduct,
  createOrder,
  fetchDashboardStats,
  login,
  demonstrateCompleteFlow,
};
