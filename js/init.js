// API Simulation
class ApiSimulator {
  constructor() {
    this.initializeStorage();
  }

  // Initialize local storage with data if not already present
  initializeStorage() {
    // Data entities to check
    const entities = [
      "products",
      "categories",
      "brands",
      "productGroups",
      "trademarks",
      "units",
      "positions",
      "status",
      "sellingPrice",
      "customers",
      "suppliers",
      "Orders",
      "user",
      "userRole",
      "userName",
    ];

    // Check if data exists in localStorage
    const needsInitialization = entities.some(
      (entity) => !localStorage.getItem(entity)
    );

    if (needsInitialization) {
      this.loadInitialData();
    }
  }

  // Load initial data to localStorage
  loadInitialData() {
    const productss = [
      {
        id: "SP000082",
        name: "iPhone 16 Pro Max 256GB | Chính hãng VN/A",
        price: "29000000",
        creditPrice: "29031000",
        costPrice: "27000000",
        quantity: 250,
        brand: "Apple",
        category: "Smartphone cao cấp",
        image: "images/iphone16promax.jpeg",
        status: "inStock",
        productCode: "SP000082",
        barcode: "",
        stockQuantity: 250,
        importPrice: "27000000",
        sellingPrice: "29000000",
        productGroup: "Điện thoại",
        trademark: "Apple",
        position: "",
        lastUpdated: "18/04/2025 11:00",
        unit: "chiếc",
        weight: "0 g",
      },
      // Include all product data from the paste.txt file...
      {
        id: "SP000083",
        name: "Samsung Galaxy S24 Ultra 512GB",
        price: "28000000",
        creditPrice: "28010000",
        costPrice: "26000000",
        quantity: 180,
        brand: "Samsung",
        category: "Smartphone cao cấp",
        image: "images/galaxy-s24-ultra.png",
        status: "inStock",
        productCode: "SP000083",
        barcode: "",
        stockQuantity: 180,
        importPrice: "26000000",
        sellingPrice: "28000000",
        productGroup: "Điện thoại",
        trademark: "Samsung",
        position: "",
        lastUpdated: "19/04/2025 09:00",
        unit: "chiếc",
        weight: "0 g",
      },
      {
        id: "SP000084",
        name: "Xiaomi 14 Pro 256GB",
        price: "19000000",
        creditPrice: "19100000",
        costPrice: "17500000",
        quantity: 120,
        brand: "Xiaomi",
        category: "Smartphone cao cấp",
        image: "images/xiaomi14pro.webp",
        status: "inStock",
        productCode: "SP000084",
        barcode: "",
        stockQuantity: 120,
        importPrice: "17500000",
        sellingPrice: "19000000",
        productGroup: "Điện thoại",
        trademark: "Xiaomi",
        position: "",
        lastUpdated: "19/04/2025 14:30",
        unit: "chiếc",
        weight: "0 g",
      },
      {
        id: "SP000085",
        name: "OPPO Find X7 Ultra",
        price: "22000000",
        creditPrice: "22080000",
        costPrice: "20000000",
        quantity: 95,
        brand: "Oppo",
        category: "Smartphone cao cấp",
        image: "images/oppo-findx7.jpg",
        status: "inStock",
        productCode: "SP000085",
        barcode: "",
        stockQuantity: 95,
        importPrice: "20000000",
        sellingPrice: "22000000",
        productGroup: "Điện thoại",
        trademark: "Oppo",
        position: "",
        lastUpdated: "20/04/2025 10:15",
        unit: "chiếc",
        weight: "0 g",
      },
      {
        id: "SP000086",
        name: "Vivo X100 Pro 5G",
        price: "17000000",
        creditPrice: "17120000",
        costPrice: "15500000",
        quantity: 60,
        brand: "Vivo",
        category: "Smartphone cao cấp",
        image: "images/vivo-x100pro.jpg",
        status: "inStock",
        productCode: "SP000086",
        barcode: "",
        stockQuantity: 60,
        importPrice: "15500000",
        sellingPrice: "17000000",
        productGroup: "Điện thoại",
        trademark: "Vivo",
        position: "",
        lastUpdated: "21/04/2025 16:40",
        unit: "chiếc",
        weight: "0 g",
      },
      {
        id: "SP000087",
        name: "Google Pixel 8 Pro 256GB",
        price: "23000000",
        creditPrice: "23100000",
        costPrice: "21000000",
        quantity: 40,
        brand: "Google",
        category: "Smartphone cao cấp",
        image: "images/pixel8pro.jpg",
        status: "inStock",
        productCode: "SP000087",
        barcode: "",
        stockQuantity: 40,
        importPrice: "21000000",
        sellingPrice: "23000000",
        productGroup: "Điện thoại",
        trademark: "Google",
        position: "",
        lastUpdated: "22/04/2025 12:00",
        unit: "chiếc",
        weight: "0 g",
      },
      {
        id: "SP000088",
        name: "Realme GT Neo6 SE",
        price: "12000000",
        creditPrice: "12100000",
        costPrice: "10800000",
        quantity: 110,
        brand: "Realme",
        category: "Smartphone tầm trung",
        image: "images/realme-gtneo6se.jpg",
        status: "inStock",
        productCode: "SP000088",
        barcode: "",
        stockQuantity: 110,
        importPrice: "10800000",
        sellingPrice: "12000000",
        productGroup: "Điện thoại",
        trademark: "Realme",
        position: "",
        lastUpdated: "22/04/2025 13:20",
        unit: "chiếc",
        weight: "0 g",
      },
      {
        id: "SP000089",
        name: "iPhone 15 Plus 128GB | Chính hãng VN/A",
        price: "22000000",
        creditPrice: "22080000",
        costPrice: "20200000",
        quantity: 80,
        brand: "Apple",
        category: "Smartphone cao cấp",
        image: "images/iphone15plus.jpeg",
        status: "inStock",
        productCode: "SP000089",
        barcode: "",
        stockQuantity: 80,
        importPrice: "20200000",
        sellingPrice: "22000000",
        productGroup: "Điện thoại",
        trademark: "Apple",
        position: "",
        lastUpdated: "23/04/2025 09:00",
        unit: "chiếc",
        weight: "0 g",
      },
      {
        id: "SP000090",
        name: "Samsung Galaxy Z Fold5",
        price: "44000000",
        creditPrice: "44120000",
        costPrice: "42000000",
        quantity: 55,
        brand: "Samsung",
        category: "Smartphone gập",
        image: "images/galaxy-zfold5.png",
        status: "inStock",
        productCode: "SP000090",
        barcode: "",
        stockQuantity: 55,
        importPrice: "42000000",
        sellingPrice: "44000000",
        productGroup: "Điện thoại",
        trademark: "Samsung",
        position: "",
        lastUpdated: "23/04/2025 14:00",
        unit: "chiếc",
        weight: "0 g",
      },
      {
        id: "SP000091",
        name: "Asus ROG Phone 8 Pro",
        price: "26000000",
        creditPrice: "26150000",
        costPrice: "24000000",
        quantity: 30,
        brand: "Asus",
        category: "Gaming phone",
        image: "images/rog8pro.webp",
        status: "inStock",
        productCode: "SP000091",
        barcode: "",
        stockQuantity: 30,
        importPrice: "24000000",
        sellingPrice: "26000000",
        productGroup: "Điện thoại",
        trademark: "Asus",
        position: "",
        lastUpdated: "24/04/2025 10:00",
        unit: "chiếc",
        weight: "0 g",
      },
      {
        id: "SP000092",
        name: "OnePlus 11 Pro",
        price: "21000000",
        creditPrice: "21150000",
        costPrice: "19000000",
        quantity: 70,
        brand: "OnePlus",
        category: "Smartphone cao cấp",
        image: "images/oneplus11pro.webp",
        status: "inStock",
        productCode: "SP000092",
        barcode: "",
        stockQuantity: 70,
        importPrice: "19000000",
        sellingPrice: "21000000",
        productGroup: "Điện thoại",
        trademark: "OnePlus",
        position: "",
        lastUpdated: "24/04/2025 15:30",
        unit: "chiếc",
        weight: "0 g",
      },
    ];

    const categories = [
      { id: "1", name: "Điện thoại" },
      { id: "2", name: "Máy tính bảng" },
      { id: "3", name: "Laptop" },
      { id: "4", name: "Phụ kiện" },
    ];

    const brands = [
      { id: "1", name: "Apple" },
      { id: "2", name: "Samsung" },
      { id: "3", name: "Xiaomi" },
      { id: "4", name: "Oppo" },
      { id: "5", name: "Vivo" },
      { id: "6", name: "Google" },
      { id: "7", name: "Realme" },
      { id: "8", name: "Asus" },
      { id: "9", name: "OnePlus" },
    ];

    const productGroups = [
      { id: "1", name: "Điện thoại" },
      { id: "2", name: "Máy tính bảng" },
      { id: "3", name: "Laptop" },
      { id: "4", name: "Phụ kiện" },
    ];

    const trademarks = [
      { id: "1", name: "Apple" },
      { id: "2", name: "Samsung" },
      { id: "3", name: "Xiaomi" },
      { id: "4", name: "Oppo" },
      { id: "5", name: "Vivo" },
      { id: "6", name: "Google" },
      { id: "7", name: "Realme" },
      { id: "8", name: "Asus" },
      { id: "9", name: "OnePlus" },
    ];

    const units = [
      { id: "1", name: "chiếc" },
      { id: "2", name: "bộ" },
      { id: "3", name: "cái" },
      { id: "4", name: "hộp" },
    ];

    const positions = [
      { id: "1", name: "kho chính" },
      { id: "2", name: "kho phụ" },
      { id: "3", name: "kho trung chuyển" },
      { id: "4", name: "kho bảo quản" },
    ];

    const status = [
      { id: "1", name: "Còn hàng" },
      { id: "2", name: "Hết hàng" },
      { id: "3", name: "Ngừng kinh doanh" },
      { id: "4", name: "Đang khuyến mãi" },
    ];

    const sellingPrice = [
      { id: "1", name: "Giá bán lẻ" },
      { id: "2", name: "Giá bán buôn" },
      { id: "3", name: "Giá khuyến mãi" },
      { id: "4", name: "Giá vốn" },
      { id: "5", name: "Giá ghi nợ" },
    ];

    const customers = [
      {
        id: "KH000001",
        name: "Nguyễn Văn A",
        phone: "0901234567",
        email: "kh1@gmail.com",
        address: "123 Đường ABC, Quận 1, TP.HCM",
      },
      {
        id: "KH000002",
        name: "Trần Thị B",
        phone: "0912345678",
        email: "kh2@gmail.com",
        address: "456 Đường DEF, Quận 2, TP.HCM",
      },
      {
        id: "KH000003",
        name: "Lê Văn C",
        phone: "0923456789",
        email: "kh3@gmail.com",
        address: "789 Đường GHI, Quận 3, TP.HCM",
      },
    ];

    const suppliers = [
      {
        id: "NCC000001",
        name: "Công ty TNHH ABC",
        phone: "0901234567",
        email: "Cty@gmail.com",
      },
    ];

    const Orders = [
      {
        customer: {
          id: "KH000002",
          name: "Trần Thị B",
          phone: "0912345678",
          email: "kh2@gmail.com",
          address: "456 Đường DEF, Quận 2, TP.HCM",
        },
        items: [
          {
            id: "SP000085",
            name: "OPPO Find X7 Ultra",
            price: "22000000",
            creditPrice: "22080000",
            costPrice: "20000000",
            quantity: 1,
            brand: "Oppo",
            category: "Smartphone cao cấp",
            image: "images/oppo-findx7.jpg",
            status: "inStock",
            productCode: "SP000085",
            barcode: "",
            stockQuantity: 95,
            importPrice: "20000000",
            sellingPrice: "22000000",
            productGroup: "Điện thoại",
            trademark: "Oppo",
            position: "",
            lastUpdated: "20/04/2025 10:15",
            unit: "chiếc",
            weight: "0 g",
            priceType: "price",
          },
          {
            id: "SP000084",
            name: "Xiaomi 14 Pro 256GB",
            price: "19000000",
            creditPrice: "19100000",
            costPrice: "17500000",
            quantity: 1,
            brand: "Xiaomi",
            category: "Smartphone cao cấp",
            image: "images/xiaomi14pro.jpg",
            status: "inStock",
            productCode: "SP000084",
            barcode: "",
            stockQuantity: 120,
            importPrice: "17500000",
            sellingPrice: "19000000",
            productGroup: "Điện thoại",
            trademark: "Xiaomi",
            position: "",
            lastUpdated: "19/04/2025 14:30",
            unit: "chiếc",
            weight: "0 g",
            priceType: "price",
          },
          {
            id: "SP000088",
            name: "Realme GT Neo6 SE",
            price: "12000000",
            creditPrice: "12100000",
            costPrice: "10800000",
            quantity: 1,
            brand: "Realme",
            category: "Smartphone tầm trung",
            image: "images/realme-gtneo6se.jpg",
            status: "inStock",
            productCode: "SP000088",
            barcode: "",
            stockQuantity: 110,
            importPrice: "10800000",
            sellingPrice: "12000000",
            productGroup: "Điện thoại",
            trademark: "Realme",
            position: "",
            lastUpdated: "22/04/2025 13:20",
            unit: "chiếc",
            weight: "0 g",
            priceType: "price",
          },
        ],
        subtotal: 53000000,
        discountPercent: 0,
        discountAmount: 0,
        priceReduction: 0,
        total: 53000000,
        paymentMethod: "cash",
        priceType: "price",
        createdAt: "2025-04-24T02:27:10.710Z",
      },
    ];

    const user = {
      id: "NV000001",
      name: "Nguyễn Văn A",
      email: "nv@gmail.com",
      phone: "0901234567",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      role: "admin",
    };

    // Save data to localStorage
    localStorage.setItem("products", JSON.stringify(productss));
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("brands", JSON.stringify(brands));
    localStorage.setItem("productGroups", JSON.stringify(productGroups));
    localStorage.setItem("trademarks", JSON.stringify(trademarks));
    localStorage.setItem("units", JSON.stringify(units));
    localStorage.setItem("positions", JSON.stringify(positions));
    localStorage.setItem("status", JSON.stringify(status));
    localStorage.setItem("sellingPrice", JSON.stringify(sellingPrice));
    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
    localStorage.setItem("Orders", JSON.stringify(Orders));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userRole", JSON.stringify("admin"));
    localStorage.setItem("userName", JSON.stringify("Nguyễn Văn A"));
  }

  // Helper methods for storage operations
  _getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  _setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Generate a unique ID for new items
  _generateId(prefix, items) {
    const latestItem = items.reduce((latest, current) => {
      // Extract the numeric part of the ID
      const currentNum = parseInt(current.id.replace(prefix, ""), 10);
      const latestNum = latest
        ? parseInt(latest.id.replace(prefix, ""), 10)
        : 0;
      return currentNum > latestNum ? current : latest;
    }, null);

    const nextNum = latestItem
      ? parseInt(latestItem.id.replace(prefix, ""), 10) + 1
      : 1;

    // Format with leading zeros
    return `${prefix}${nextNum.toString().padStart(6, "0")}`;
  }

  // API Endpoints

  // Products
  getProducts(params = {}) {
    const products = this._getItem("products") || [];

    // Filter by search term if provided
    let filteredProducts = products;
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.productCode.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by brand if provided
    if (params.brand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.toLowerCase() === params.brand.toLowerCase()
      );
    }

    // Filter by category if provided
    if (params.category) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category.toLowerCase().includes(params.category.toLowerCase())
      );
    }

    // Filter by status if provided
    if (params.status) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.status.toLowerCase() === params.status.toLowerCase()
      );
    }

    // Pagination
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit
      ? parseInt(params.limit)
      : filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      meta: {
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
      },
    };
  }

  getProductById(id) {
    const products = this._getItem("products") || [];
    const product = products.find((p) => p.id === id);

    if (!product) {
      return { error: "Product not found", status: 404 };
    }

    return { data: product };
  }

  createProduct(productData) {
    const products = this._getItem("products") || [];

    // Generate new ID
    const newId = this._generateId("SP", products);

    const newProduct = {
      ...productData,
      id: newId,
      productCode: newId,
      lastUpdated: new Date().toLocaleString("vi-VN"),
    };

    products.push(newProduct);
    this._setItem("products", products);

    return { data: newProduct, status: 201 };
  }

  updateProduct(id, productData) {
    const products = this._getItem("products") || [];
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return { error: "Product not found", status: 404 };
    }

    const updatedProduct = {
      ...products[index],
      ...productData,
      lastUpdated: new Date().toLocaleString("vi-VN"),
    };

    products[index] = updatedProduct;
    this._setItem("products", products);

    return { data: updatedProduct };
  }

  deleteProduct(id) {
    const products = this._getItem("products") || [];
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return { error: "Product not found", status: 404 };
    }

    const deletedProduct = products.splice(index, 1)[0];
    this._setItem("products", products);

    return { data: deletedProduct };
  }

  // Categories
  getCategories() {
    return { data: this._getItem("categories") || [] };
  }

  getCategoryById(id) {
    const categories = this._getItem("categories") || [];
    const category = categories.find((c) => c.id === id);

    if (!category) {
      return { error: "Category not found", status: 404 };
    }

    return { data: category };
  }

  createCategory(categoryData) {
    const categories = this._getItem("categories") || [];

    // Generate new ID
    const newId = (categories.length + 1).toString();

    const newCategory = {
      ...categoryData,
      id: newId,
    };

    categories.push(newCategory);
    this._setItem("categories", categories);

    return { data: newCategory, status: 201 };
  }

  updateCategory(id, categoryData) {
    const categories = this._getItem("categories") || [];
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      return { error: "Category not found", status: 404 };
    }

    const updatedCategory = {
      ...categories[index],
      ...categoryData,
    };

    categories[index] = updatedCategory;
    this._setItem("categories", categories);

    return { data: updatedCategory };
  }

  deleteCategory(id) {
    const categories = this._getItem("categories") || [];
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      return { error: "Category not found", status: 404 };
    }

    const deletedCategory = categories.splice(index, 1)[0];
    this._setItem("categories", categories);

    return { data: deletedCategory };
  }

  // Brands
  getBrands() {
    return { data: this._getItem("brands") || [] };
  }

  // Orders
  getOrders(params = {}) {
    const orders = this._getItem("Orders") || [];

    // Filter logic can be added here

    // Pagination
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : orders.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedOrders = orders.slice(startIndex, endIndex);

    return {
      data: paginatedOrders,
      meta: {
        total: orders.length,
        page,
        limit,
        totalPages: Math.ceil(orders.length / limit),
      },
    };
  }

  getOrderById(id) {
    const orders = this._getItem("Orders") || [];
    const order = orders.find((o) => o.id === id);

    if (!order) {
      return { error: "Order not found", status: 404 };
    }

    return { data: order };
  }

  createOrder(orderData) {
    const orders = this._getItem("Orders") || [];

    // Generate new ID
    const newId = `ORD${new Date().getTime()}`;

    const newOrder = {
      ...orderData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    this._setItem("Orders", orders);

    // Update product quantities
    this.updateProductQuantitiesAfterOrder(newOrder);

    return { data: newOrder, status: 201 };
  }

  updateProductQuantitiesAfterOrder(order) {
    const products = this._getItem("products") || [];

    order.items.forEach((item) => {
      const productIndex = products.findIndex((p) => p.id === item.id);
      if (productIndex !== -1) {
        products[productIndex].quantity -= item.quantity;
        products[productIndex].stockQuantity -= item.quantity;
      }
    });

    this._setItem("products", products);
  }

  // Customers
  getCustomers(params = {}) {
    const customers = this._getItem("customers") || [];

    // Filter by search term if provided
    let filteredCustomers = customers;
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredCustomers = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm) ||
          customer.phone.includes(searchTerm) ||
          customer.email.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit
      ? parseInt(params.limit)
      : filteredCustomers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    return {
      data: paginatedCustomers,
      meta: {
        total: filteredCustomers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredCustomers.length / limit),
      },
    };
  }

  getCustomerById(id) {
    const customers = this._getItem("customers") || [];
    const customer = customers.find((c) => c.id === id);

    if (!customer) {
      return { error: "Customer not found", status: 404 };
    }

    return { data: customer };
  }

  createCustomer(customerData) {
    const customers = this._getItem("customers") || [];

    // Generate new ID
    const newId = this._generateId("KH", customers);

    const newCustomer = {
      ...customerData,
      id: newId,
    };

    customers.push(newCustomer);
    this._setItem("customers", customers);

    return { data: newCustomer, status: 201 };
  }

  updateCustomer(id, customerData) {
    const customers = this._getItem("customers") || [];
    const index = customers.findIndex((c) => c.id === id);

    if (index === -1) {
      return { error: "Customer not found", status: 404 };
    }

    const updatedCustomer = {
      ...customers[index],
      ...customerData,
    };

    customers[index] = updatedCustomer;
    this._setItem("customers", customers);

    return { data: updatedCustomer };
  }

  deleteCustomer(id) {
    const customers = this._getItem("customers") || [];
    const index = customers.findIndex((c) => c.id === id);

    if (index === -1) {
      return { error: "Customer not found", status: 404 };
    }

    const deletedCustomer = customers.splice(index, 1)[0];
    this._setItem("customers", customers);

    return { data: deletedCustomer };
  }

  // Authentication
  login(credentials) {
    const user = this._getItem("user");

    // Simple authentication (in a real app, you'd have proper authentication)
    if (credentials.email === user.email) {
      return {
        data: {
          token: "simulated-jwt-token",
          user: user,
        },
      };
    } else {
      return { error: "Invalid credentials", status: 401 };
    }
  }

  getCurrentUser() {
    const user = this._getItem("user");
    return { data: user };
  }

  logout() {
    return { data: { message: "Logged out successfully" } };
  }

  // Suppliers
  getSuppliers(params = {}) {
    const suppliers = this._getItem("suppliers") || [];

    // Filter by search term if provided
    let filteredSuppliers = suppliers;
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredSuppliers = suppliers.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchTerm) ||
          supplier.phone.includes(searchTerm) ||
          supplier.email.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit
      ? parseInt(params.limit)
      : filteredSuppliers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedSuppliers = filteredSuppliers.slice(startIndex, endIndex);

    return {
      data: paginatedSuppliers,
      meta: {
        total: filteredSuppliers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredSuppliers.length / limit),
      },
    };
  }

  getSupplierById(id) {
    const suppliers = this._getItem("suppliers") || [];
    const supplier = suppliers.find((s) => s.id === id);

    if (!supplier) {
      return { error: "Supplier not found", status: 404 };
    }

    return { data: supplier };
  }

  createSupplier(supplierData) {
    const suppliers = this._getItem("suppliers") || [];

    // Generate new ID
    const newId = this._generateId("NCC", suppliers);

    const newSupplier = {
      ...supplierData,
      id: newId,
    };

    suppliers.push(newSupplier);
    this._setItem("suppliers", suppliers);

    return { data: newSupplier, status: 201 };
  }

  updateSupplier(id, supplierData) {
    const suppliers = this._getItem("suppliers") || [];
    const index = suppliers.findIndex((s) => s.id === id);

    if (index === -1) {
      return { error: "Supplier not found", status: 404 };
    }

    const updatedSupplier = {
      ...suppliers[index],
      ...supplierData,
    };

    suppliers[index] = updatedSupplier;
    this._setItem("suppliers", suppliers);

    return { data: updatedSupplier };
  }

  deleteSupplier(id) {
    const suppliers = this._getItem("suppliers") || [];
    const index = suppliers.findIndex((s) => s.id === id);

    if (index === -1) {
      return { error: "Supplier not found", status: 404 };
    }

    const deletedSupplier = suppliers.splice(index, 1)[0];
    this._setItem("suppliers", suppliers);

    return { data: deletedSupplier };
  }

  // Master data endpoints
  getProductGroups() {
    return { data: this._getItem("productGroups") || [] };
  }

  getTrademarks() {
    return { data: this._getItem("trademarks") || [] };
  }

  getUnits() {
    return { data: this._getItem("units") || [] };
  }

  getPositions() {
    return { data: this._getItem("positions") || [] };
  }

  getStatuses() {
    return { data: this._getItem("status") || [] };
  }

  getSellingPriceTypes() {
    return { data: this._getItem("sellingPrice") || [] };
  }

  // Dashboard data
  getDashboardStats() {
    const products = this._getItem("products") || [];
    const orders = this._getItem("Orders") || [];
    const customers = this._getItem("customers") || [];

    // Calculate total inventory value
    const inventoryValue = products.reduce((total, product) => {
      return total + parseInt(product.costPrice) * product.quantity;
    }, 0);

    // Calculate revenue from orders
    const revenue = orders.reduce((total, order) => {
      return total + order.total;
    }, 0);

    // Get low stock products (less than 50 items)
    const lowStockProducts = products.filter((p) => p.quantity < 50).length;

    // Products by brand distribution
    const brandDistribution = {};
    products.forEach((product) => {
      if (!brandDistribution[product.brand]) {
        brandDistribution[product.brand] = 0;
      }
      brandDistribution[product.brand] += product.quantity;
    });

    return {
      data: {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalCustomers: customers.length,
        inventoryValue,
        revenue,
        lowStockProducts,
        brandDistribution,
      },
    };
  }

  // Sales reports
  getSalesReport(params = {}) {
    const orders = this._getItem("Orders") || [];
    const startDate = params.startDate
      ? new Date(params.startDate)
      : new Date(0);
    const endDate = params.endDate ? new Date(params.endDate) : new Date();

    // Filter orders by date range
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });

    // Calculate totals
    const totalSales = filteredOrders.reduce(
      (sum, order) => sum + order.total,
      0
    );
    const totalItems = filteredOrders.reduce((sum, order) => {
      return (
        sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0)
      );
    }, 0);

    // Calculate revenue by product
    const productSales = {};
    filteredOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productSales[item.id]) {
          productSales[item.id] = {
            productId: item.id,
            productName: item.name,
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[item.id].quantity += item.quantity;
        productSales[item.id].revenue += parseInt(item.price) * item.quantity;
      });
    });

    return {
      data: {
        totalSales,
        totalOrders: filteredOrders.length,
        totalItems,
        productSales: Object.values(productSales),
      },
    };
  }

  // Inventory reports
  getInventoryReport() {
    const products = this._getItem("products") || [];

    const inventoryItems = products.map((product) => {
      const value = parseInt(product.costPrice) * product.quantity;
      return {
        productId: product.id,
        productName: product.name,
        quantity: product.quantity,
        costPrice: product.costPrice,
        value,
        lastUpdated: product.lastUpdated,
      };
    });

    const totalValue = inventoryItems.reduce(
      (sum, item) => sum + item.value,
      0
    );
    const totalQuantity = inventoryItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return {
      data: {
        items: inventoryItems,
        totalValue,
        totalQuantity,
        totalProducts: inventoryItems.length,
      },
    };
  }
}

// Initialize the API simulator
const api = new ApiSimulator();

// Middleware to simulate API requests
function apiRequest(endpoint, method, data) {
  // Add a small delay to simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      let response;

      // Process the request based on endpoint and method
      switch (true) {
        // Products endpoints
        case endpoint === "/api/products" && method === "GET":
          response = api.getProducts(data);
          break;
        case endpoint.match(/^\/api\/products\/[^/]+$/) && method === "GET":
          const productId = endpoint.split("/").pop();
          response = api.getProductById(productId);
          break;
        case endpoint === "/api/products" && method === "POST":
          response = api.createProduct(data);
          break;
        case endpoint.match(/^\/api\/products\/[^/]+$/) && method === "PUT":
          const updateProductId = endpoint.split("/").pop();
          response = api.updateProduct(updateProductId, data);
          break;
        case endpoint.match(/^\/api\/products\/[^/]+$/) && method === "DELETE":
          const deleteProductId = endpoint.split("/").pop();
          response = api.deleteProduct(deleteProductId);
          break;

        // Categories endpoints
        case endpoint === "/api/categories" && method === "GET":
          response = api.getCategories();
          break;
        case endpoint.match(/^\/api\/categories\/[^/]+$/) && method === "GET":
          const categoryId = endpoint.split("/").pop();
          response = api.getCategoryById(categoryId);
          break;
        case endpoint === "/api/categories" && method === "POST":
          response = api.createCategory(data);
          break;
        case endpoint.match(/^\/api\/categories\/[^/]+$/) && method === "PUT":
          const updateCategoryId = endpoint.split("/").pop();
          response = api.updateCategory(updateCategoryId, data);
          break;
        case endpoint.match(/^\/api\/categories\/[^/]+$/) &&
          method === "DELETE":
          const deleteCategoryId = endpoint.split("/").pop();
          response = api.deleteCategory(deleteCategoryId);
          break;

        // Brands endpoint
        case endpoint === "/api/brands" && method === "GET":
          response = api.getBrands();
          break;

        // Orders endpoints
        case endpoint === "/api/orders" && method === "GET":
          response = api.getOrders(data);
          break;
        case endpoint.match(/^\/api\/orders\/[^/]+$/) && method === "GET":
          const orderId = endpoint.split("/").pop();
          response = api.getOrderById(orderId);
          break;
        case endpoint === "/api/orders" && method === "POST":
          response = api.createOrder(data);
          break;

        // Customers endpoints
        case endpoint === "/api/customers" && method === "GET":
          response = api.getCustomers(data);
          break;
        case endpoint.match(/^\/api\/customers\/[^/]+$/) && method === "GET":
          const customerId = endpoint.split("/").pop();
          response = api.getCustomerById(customerId);
          break;
        case endpoint === "/api/customers" && method === "POST":
          response = api.createCustomer(data);
          break;
        case endpoint.match(/^\/api\/customers\/[^/]+$/) && method === "PUT":
          const updateCustomerId = endpoint.split("/").pop();
          response = api.updateCustomer(updateCustomerId, data);
          break;
        case endpoint.match(/^\/api\/customers\/[^/]+$/) && method === "DELETE":
          const deleteCustomerId = endpoint.split("/").pop();
          response = api.deleteCustomer(deleteCustomerId);
          break;

        // Authentication endpoints
        case endpoint === "/api/auth/login" && method === "POST":
          response = api.login(data);
          break;
        case endpoint === "/api/auth/user" && method === "GET":
          response = api.getCurrentUser();
          break;
        case endpoint === "/api/auth/logout" && method === "POST":
          response = api.logout();
          break;

        // Master data endpoints
        case endpoint === "/api/product-groups" && method === "GET":
          response = api.getProductGroups();
          break;
        case endpoint === "/api/trademarks" && method === "GET":
          response = api.getTrademarks();
          break;
        case endpoint === "/api/units" && method === "GET":
          response = api.getUnits();
          break;
        case endpoint === "/api/positions" && method === "GET":
          response = api.getPositions();
          break;
        case endpoint === "/api/statuses" && method === "GET":
          response = api.getStatuses();
          break;
        case endpoint === "/api/selling-price-types" && method === "GET":
          response = api.getSellingPriceTypes();
          break;

        // Dashboard stats
        case endpoint === "/api/dashboard/stats" && method === "GET":
          response = api.getDashboardStats();
          break;

        // Reports
        case endpoint === "/api/reports/sales" && method === "GET":
          response = api.getSalesReport(data);
          break;
        case endpoint === "/api/reports/inventory" && method === "GET":
          response = api.getInventoryReport();
          break;

        // Suppliers endpoints
        case endpoint === "/api/suppliers" && method === "GET":
          response = api.getSuppliers(data);
          break;
        case endpoint.match(/^\/api\/suppliers\/[^/]+$/) && method === "GET":
          const supplierId = endpoint.split("/").pop();
          response = api.getSupplierById(supplierId);
          break;
        case endpoint === "/api/suppliers" && method === "POST":
          response = api.createSupplier(data);
          break;
        case endpoint.match(/^\/api\/suppliers\/[^/]+$/) && method === "PUT":
          const updateSupplierId = endpoint.split("/").pop();
          response = api.updateSupplier(updateSupplierId, data);
          break;
        case endpoint.match(/^\/api\/suppliers\/[^/]+$/) && method === "DELETE":
          const deleteSupplierId = endpoint.split("/").pop();
          response = api.deleteSupplier(deleteSupplierId);
          break;

        default:
          response = { error: "Endpoint not found", status: 404 };
      }

      // Simulate HTTP status
      const status =
        response.status || (response.error ? response.status || 400 : 200);

      resolve({
        data: response.data || response,
        error: response.error,
        status,
      });
    }, 300); // 300ms delay to simulate network latency
  });
}

// Example of how to use the API
// Usage:
// apiRequest('/api/products', 'GET', { page: 1, limit: 10 })
//   .then(response => console.log(response));

// Export the API simulator
export { apiRequest };
