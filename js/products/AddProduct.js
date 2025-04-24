export class AddProductController {
  constructor(
    productService,
    productListView,
    generateProductId,
    getCurrentDateTime,
    closeModal
  ) {
    this.productService = productService;
    this.productListView = productListView;
    this.generateProductId = generateProductId;
    this.getCurrentDateTime = getCurrentDateTime;
    this.closeModal = closeModal;
    this.modal = document.getElementById("addModal");
    this.form = document.getElementById("addForm");

    // Form inputs
    this.inputs = {
      name: document.getElementById("addProductName"),
      costPrice: document.getElementById("addCostPrice"),
      price: document.getElementById("addPrice"),
      creditPrice: document.getElementById("addCreditPrice"),
      quantity: document.getElementById("addProductQuantity"),
      brand: document.getElementById("addBrand"),
      productCode: document.getElementById("addProductCode"),
      category: document.getElementById("addCategory"),
      productGroup: document.getElementById("addProductGroup"),
      position: document.getElementById("addPosition"),
      unit: document.getElementById("addUnit"),
      weight: document.getElementById("addWeight"),
      status: document.getElementById("addStatus"),
      barcode: document.getElementById("addBarcode"),
      imageUpload: document.getElementById("addImageUpload"),
      productImage: document.getElementById("addProductImage"),
    };

    this.autoGenerateCodeCheckbox = document.getElementById("autoGenerateCode");

    this._initEventListeners();
  }

  _initEventListeners() {
    // Show add product modal when Add button is clicked
    document
      .querySelector(".btn-action")
      .addEventListener("click", () => this.showAddModal());

    // Handle form submission
    this.form.addEventListener("submit", (e) => this._handleSubmit(e));

    // Close modal with various buttons
    document.querySelector("#addModal .close").addEventListener("click", () => {
      this.closeModal(this.modal);
    });

    document.querySelector(".btn-cancel").addEventListener("click", (e) => {
      e.preventDefault();
      this.closeModal(this.modal);
    });

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.closeModal(this.modal);
      }
    });

    // Handle auto-generate checkbox change
    if (this.autoGenerateCodeCheckbox) {
      this.autoGenerateCodeCheckbox.addEventListener("change", () => {
        if (this.autoGenerateCodeCheckbox.checked) {
          this.inputs.productCode.value = this.generateProductId(
            this.productService.getProducts()
          );
          this.inputs.productCode.readOnly = true;
        } else {
          this.inputs.productCode.readOnly = false;
        }
      });
    }

    // Trigger file selection when clicking on image container
    document
      .querySelector(".product-image-container")
      .addEventListener("click", () => {
        this.inputs.imageUpload.click();
      });

    // Display image preview when file is selected
    this.inputs.imageUpload.addEventListener("change", (event) => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.inputs.productImage.src = e.target.result;
          this.inputs.productImage.style.opacity = "1";
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    });
  }

  showAddModal() {
    // Clear the form fields
    this.form.reset();

    // Reset image placeholder
    this.inputs.productImage.src = "./images/placeholder-image.png";
    this.inputs.productImage.style.opacity = "0.6";

    // Generate a new product code if auto-generate is checked
    if (
      this.autoGenerateCodeCheckbox &&
      this.autoGenerateCodeCheckbox.checked
    ) {
      this.inputs.productCode.value = this.generateProductId(
        this.productService.getProducts()
      );
    }

    // Show the modal
    this.modal.style.display = "block";
  }

  _handleSubmit(e) {
    e.preventDefault();

    // Create a new product object
    const newProduct = {
      id: this.inputs.productCode.value,
      name: this.inputs.name.value,
      costPrice: this.inputs.costPrice.value,
      price: this.inputs.price.value,
      creditPrice: this.inputs.creditPrice.value || this.inputs.price.value, // Default to price if not specified
      quantity: parseInt(this.inputs.quantity.value),
      brand: this.inputs.brand.value,
      category: this.inputs.category.value,
      productCode: this.inputs.productCode.value,
      unit: this.inputs.unit.value || "chiếc",
      status: this.inputs.status.value,
      image: this.inputs.productImage.src.startsWith("data:")
        ? `images/product-${this.inputs.productCode.value}.jpg`
        : "./images/placeholder-image.png",
      importPrice: this.inputs.costPrice.value,
      sellingPrice: this.inputs.price.value,
      stockQuantity: parseInt(this.inputs.quantity.value),
      trademark: this.inputs.brand.value,
      productGroup:
        this.inputs.productGroup.value || this.inputs.category.value,
      position: this.inputs.position.value || "",
      barcode: this.inputs.barcode.value || "",
      weight: this.inputs.weight.value || "0 g",
      lastUpdated: this.getCurrentDateTime(),
    };

    // Add the new product
    this.productService.addProduct(newProduct);

    // Re-render the product list and close the modal
    this.productListView.renderProducts();
    this.closeModal(this.modal);

    // Show success message
    alert("Thêm sản phẩm thành công!");
  }
}
