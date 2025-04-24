import {
  ProductService,
  ProductListView,
  EditProductController,
  AddProductController,
  ImportExportController,
  FilterProductController,
  getCurrentDateTime,
  formatCurrency,
  closeModal,
  generateProductId,
  existingProductCode,
} from "./index.js";

document.addEventListener("DOMContentLoaded", () => {
  const productService = new ProductService();

  const productContainer = document.getElementById("product-list");
  const productListView = new ProductListView(
    productContainer,
    productService,
    formatCurrency // bỏ dấu () vì bạn truyền reference, không gọi ngay
  );

  const editProductController = new EditProductController(
    productService,
    productListView,
    getCurrentDateTime,
    closeModal,
    existingProductCode
  );
  const addProductController = new AddProductController(
    productService,
    productListView,
    generateProductId,
    getCurrentDateTime,
    closeModal
  );
  const importExportController = new ImportExportController(
    productService,
    productListView,
    formatCurrency
  );

  // Initialize the filter controller
  const filterProductController = new FilterProductController(
    productService,
    productListView
  );

  // Populate the category filter with existing categories
  filterProductController.populateCategoryFilter();

  productListView.bindDeleteProduct((productId) => {
    productService.deleteProduct(productId);
    productListView.renderProducts();
    // Update filter options after product changes
    filterProductController.populateCategoryFilter();
  });

  productListView.renderProducts();
});
