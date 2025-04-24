export class ProductListView {
  constructor(containerElement, productService, formatCurrency) {
    this.containerElement = containerElement;
    this.productService = productService;
    this.formatCurrency = formatCurrency;
  }

  renderProducts() {
    const products = this.productService.getProducts();
    this.containerElement.innerHTML = "";

    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${this.formatCurrency(product.costPrice)}</td>
        <td>${this.formatCurrency(product.price)}</td>
        <td>${product.quantity}</td>
        <td>
          <button class="btn-edit" data-id="${product.id}">✏️</button>
          <button class="btn-delete" data-id="${product.id}">🗑️</button>
        </td>
      `;
      this.containerElement.appendChild(row);
    });
  }

  bindEditProduct(handler) {
    this.containerElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-edit")) {
        const productId = event.target.getAttribute("data-id");
        handler(productId);
      }
    });
  }

  bindDeleteProduct(handler) {
    this.containerElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-delete")) {
        const productId = event.target.getAttribute("data-id");
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
          handler(productId);
        }
      }
    });
  }
}
