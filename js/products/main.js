import {
  ProductService,
  ProductListView,
  EditProductController,
  AddProductController,
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

  productListView.bindDeleteProduct((productId) => {
    productService.deleteProduct(productId);
    productListView.renderProducts();
  });

  productListView.renderProducts();
});
