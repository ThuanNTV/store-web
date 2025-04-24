export class EditProductController {
  constructor(
    productService,
    productListView,
    getCurrentDateTime,
    closeModal,
    existingProductCode
  ) {
    this.productService = productService;
    this.productListView = productListView;
    this.getCurrentDateTime = getCurrentDateTime;
    this.existingProductCode = existingProductCode;
    this.closeModal = closeModal;
    this.modal = document.getElementById("editModal");
    this.form = document.getElementById("editForm");
    this.currentProductId = null;

    // Form inputs
    this.inputs = {
      name: document.getElementById("productName"),
      costPrice: document.getElementById("costPrice"),
      price: document.getElementById("price"),
      creditPrice: document.getElementById("creditPrice"),
      quantity: document.getElementById("productQuantity"),
      brand: document.getElementById("brand"),
      productCode: document.getElementById("productCode"),
      category: document.getElementById("category"),
      unit: document.getElementById("unit"),
    };

    this._initEventListeners();
  }

  _initEventListeners() {
    // Handle form submission
    this.form.addEventListener("submit", (e) => this._handleSubmit(e));

    // Close modal when clicking the close button
    const closeButtons = this.modal.querySelectorAll(".close");
    closeButtons.forEach((button) => {
      // Sử dụng this.closeModal thay vì closeModal
      button.addEventListener("click", () => this.closeModal(this.modal));
    });

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        // Sử dụng this.closeModal thay vì closeModal
        this.closeModal(this.modal);
      }
    });

    // Setup edit product event binding
    this.productListView.bindEditProduct((productId) =>
      this.showEditModal(productId)
    );
  }

  showEditModal(productId) {
    const product = this.productService.getProductById(productId);
    if (!product) return;

    this.currentProductId = productId;

    // Pre-fill the form with product data
    this.inputs.name.value = product.name;
    this.inputs.costPrice.value = product.costPrice;
    this.inputs.price.value = product.price;
    this.inputs.creditPrice.value = product.creditPrice;
    this.inputs.quantity.value = product.quantity;
    this.inputs.brand.value = product.brand;
    this.inputs.productCode.value = product.productCode || product.id;
    this.inputs.category.value = product.category;
    this.inputs.unit.value = product.unit || "chiếc";

    // Show modal
    this.modal.style.display = "block";
  }

  _handleSubmit(e) {
    e.preventDefault();
    const existingCodes = this.existingProductCode(
      this.productService.getProducts()
    );
    if (
      existingCodes.includes(this.inputs.productCode.value) ||
      this.inputs.productCode.value !== this.currentProductId
    ) {
      alert("Mã sản phẩm đã tồn tại. Vui lòng nhập mã khác.");
      return;
    }
    if (this.inputs.productCode.value === "") {
      alert("Vui lòng nhập mã sản phẩm.");
      return;
    }

    const updatedProduct = {
      name: this.inputs.name.value,
      costPrice: this.inputs.costPrice.value,
      price: this.inputs.price.value,
      creditPrice: this.inputs.creditPrice.value,
      quantity: parseInt(this.inputs.quantity.value),
      brand: this.inputs.brand.value,
      productCode: this.inputs.productCode.value,
      category: this.inputs.category.value,
      unit: this.inputs.unit.value,
      importPrice: this.inputs.costPrice.value,
      sellingPrice: this.inputs.price.value,
      stockQuantity: parseInt(this.inputs.quantity.value),
      trademark: this.inputs.brand.value,
      productGroup: this.inputs.category.value,
      lastUpdated: this.getCurrentDateTime(),
    };

    this.productService.updateProduct(this.currentProductId, updatedProduct);
    this.productListView.renderProducts();
    // Sử dụng this.closeModal thay vì closeModal
    this.closeModal(this.modal);
  }
}
