export class FilterProductController {
  constructor(productService, productListView) {
    this.productService = productService;
    this.productListView = productListView;
    this.originalProducts = [];

    // Filter elements
    this.searchInput = document.getElementById("search-product");
    this.categorySelect = document.getElementById("category-select");
    this.priceInputs = document.querySelectorAll(
      ".filter-group input[type='number']"
    );
    this.minPriceInput = this.priceInputs[0];
    this.maxPriceInput = this.priceInputs[1];
    this.stockInput = this.priceInputs[2];
    this.filterButton = document.querySelector(".btn-filter");

    this._initEventListeners();
  }

  _initEventListeners() {
    // Store original products on initial load
    this.originalProducts = [...this.productService.getProducts()];

    // Filter on button click
    this.filterButton.addEventListener("click", () => this.applyFilters());

    // Optional: Real-time filtering on search input
    this.searchInput.addEventListener("input", () => this.applyFilters());

    // Optional: Real-time filtering on category change
    this.categorySelect.addEventListener("change", () => this.applyFilters());
  }

  applyFilters() {
    // Get filter values
    const searchTerm = this.searchInput.value.toLowerCase().trim();
    const categoryFilter = this.categorySelect.value;
    const minPrice = this.minPriceInput.value
      ? parseFloat(this.minPriceInput.value)
      : 0;
    const maxPrice = this.maxPriceInput.value
      ? parseFloat(this.maxPriceInput.value)
      : Infinity;
    const minStock = this.stockInput.value
      ? parseInt(this.stockInput.value)
      : 0;

    // Always start with full product list
    const allProducts = this.productService.getProducts();

    // Apply filters
    const filteredProducts = allProducts.filter((product) => {
      // Search by name or product code
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm) ||
        (product.productCode &&
          product.productCode.toLowerCase().includes(searchTerm)) ||
        (product.id && product.id.toLowerCase().includes(searchTerm));

      // Filter by category
      const matchesCategory =
        categoryFilter === "" ||
        product.category === categoryFilter ||
        product.productGroup === categoryFilter;

      // Filter by price range
      const price = parseFloat(product.price || product.sellingPrice);
      const matchesPrice =
        (isNaN(minPrice) || price >= minPrice) &&
        (isNaN(maxPrice) || price <= maxPrice);

      // Filter by stock quantity
      const quantity = parseInt(product.quantity || product.stockQuantity);
      const matchesStock = isNaN(minStock) || quantity >= minStock;

      // Product matches all filters
      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });

    // Update the product list UI with filtered results
    this.renderFilteredProducts(filteredProducts);
  }

  renderFilteredProducts(products) {
    // Update the container with filtered products
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";

    if (products.length === 0) {
      // Display message when no products match filters
      const noResultsRow = document.createElement("tr");
      noResultsRow.innerHTML = `
          <td colspan="6" class="no-results">Không tìm thấy sản phẩm nào phù hợp với bộ lọc</td>
        `;
      productContainer.appendChild(noResultsRow);
    } else {
      // Render filtered products
      products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${this.productListView.formatCurrency(product.costPrice)}</td>
            <td>${this.productListView.formatCurrency(product.price)}</td>
            <td>${product.quantity}</td>
            <td>
              <button class="btn-edit" data-id="${product.id}">✏️</button>
              <button class="btn-delete" data-id="${product.id}">🗑️</button>
            </td>
          `;
        productContainer.appendChild(row);
      });
    }
  }

  resetFilters() {
    // Clear all filter inputs
    this.searchInput.value = "";
    this.categorySelect.value = "";
    this.minPriceInput.value = "";
    this.maxPriceInput.value = "";
    this.stockInput.value = "";

    // Restore original product list
    this.productListView.renderProducts();
  }

  // Method to populate category filter dropdown from existing product data
  populateCategoryFilter() {
    const products = this.productService.getProducts();
    const categories = new Set();

    // Extract unique categories
    products.forEach((product) => {
      if (product.category) categories.add(product.category);
      if (product.productGroup && product.productGroup !== product.category) {
        categories.add(product.productGroup);
      }
    });

    // Clear existing options except the first one (All)
    while (this.categorySelect.options.length > 1) {
      this.categorySelect.remove(1);
    }

    // Add category options
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      this.categorySelect.appendChild(option);
    });
  }
}
