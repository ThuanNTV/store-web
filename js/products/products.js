const products = [
  {
    id: "SP000082",
    name: "iPhone 16 Pro Max 256GB | Chính hãng VN/A",
    price: "29000000",
    creditPrice: "29031000",
    costPrice: "27000000",
    quantity: 250,
    brand: "Apple",
    category: "Smartphone cao cấp",
    image: "images/iphone16promax.jpg",
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
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: "28000000",
    creditPrice: "28005000",
    costPrice: "26000000",
    quantity: 1,
    brand: "Samsung",
    category: "Smartphone cao cấp",
    image: "images/galaxy-s24-ultra.jpg",
    status: "inStock",
  },
  // ... other products remain the same
];

const closeModal = (modal) => {
  modal.style.display = "none"; // Close the modal
  modal.classList.remove("show"); // Remove the show class for add modal
};

// Edit modal DOM elements
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const productNameInput = document.getElementById("productName");
const costPriceInput = document.getElementById("costPrice");
const priceInput = document.getElementById("price");
const creditPriceInput = document.getElementById("creditPrice");
const productQuantityInput = document.getElementById("productQuantity");
const brandInput = document.getElementById("brand");
const productCodeInput = document.getElementById("productCode");
const categoryInput = document.getElementById("category");
const unitInput = document.getElementById("unit");

// Add modal DOM elements
const addModal = document.getElementById("addModal");
const addForm = document.getElementById("addForm");
const addProductNameInput = document.getElementById("addProductName");
const addCostPriceInput = document.getElementById("addCostPrice");
const addPriceInput = document.getElementById("addPrice");
const addCreditPriceInput = document.getElementById("addCreditPrice");
const addProductQuantityInput = document.getElementById("addProductQuantity");
const addBrandInput = document.getElementById("addBrand");
const addProductCodeInput = document.getElementById("addProductCode");
const addCategoryInput = document.getElementById("addCategory");
const addProductGroupInput = document.getElementById("addProductGroup");
const addPositionInput = document.getElementById("addPosition");
const addUnitInput = document.getElementById("addUnit");
const addWeightInput = document.getElementById("addWeight");
const addStatusInput = document.getElementById("addStatus");
const addBarcodeInput = document.getElementById("addBarcode");
const addImageUpload = document.getElementById("addImageUpload");
const addProductImage = document.getElementById("addProductImage");
const autoGenerateCodeCheckbox = document.getElementById("autoGenerateCode");

let currentProductId = null; // To store the product being edited

// Product container for displaying product list
const productContainer = document.getElementById("product-list");

// Render products list
function renderProducts(products) {
  productContainer.innerHTML = ""; // Clear the container
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${formatCurrency(product.costPrice)}</td>
        <td>${formatCurrency(product.price)}</td>
        <td>${product.quantity}</td>
        <td>
          <button class="btn-edit" data-id="${product.id}">✏️</button>
          <button class="btn-delete" data-id="${product.id}">🗑️</button>
        </td>
      `;
    productContainer.appendChild(row);
  });
}

// Utility function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Generate a new unique product ID
function generateProductId() {
  const existingIds = products.map((product) => product.id);

  // Check if using SP format
  const spPattern = /^SP\d+$/;
  const hasSPFormat = existingIds.some((id) => spPattern.test(id));

  if (hasSPFormat) {
    // Find highest SP number and increment
    const spIds = existingIds.filter((id) => spPattern.test(id));
    let highestNum = 0;

    if (spIds.length > 0) {
      highestNum = Math.max(
        ...spIds.map((id) => parseInt(id.replace("SP", "")))
      );
    }

    const newNum = highestNum + 1;
    return `SP${newNum.toString().padStart(6, "0")}`;
  } else {
    // For numeric IDs
    const numericIds = existingIds.filter((id) => !isNaN(parseInt(id)));
    if (numericIds.length > 0) {
      const newId = Math.max(...numericIds.map((id) => parseInt(id))) + 1;
      return newId.toString();
    } else {
      return "1"; // Default start
    }
  }
}

// Get current datetime formatted for Vietnam locale
function getCurrentDateTime() {
  return new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Handle product list actions (edit and delete)
productContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.hasAttribute("data-id")) return;

  const productId = target.getAttribute("data-id");

  if (target.classList.contains("btn-edit")) {
    // Handle edit action
    const product = products.find((p) => p.id === productId);
    if (product) {
      // Pre-fill the form with product data
      currentProductId = productId;
      productNameInput.value = product.name;
      costPriceInput.value = product.costPrice;
      priceInput.value = product.price;
      creditPriceInput.value = product.creditPrice;
      productQuantityInput.value = product.quantity;
      brandInput.value = product.brand;
      productCodeInput.value = product.productCode || product.id;
      categoryInput.value = product.category;
      unitInput.value = product.unit || "chiếc";

      // Show modal
      editModal.style.display = "block";
    }
  } else if (target.classList.contains("btn-delete")) {
    // Handle delete action
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        products.splice(productIndex, 1); // Remove the product from the array
        renderProducts(products); // Re-render the product list
      }
    }
  }
});

// Handle edit form submission
editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const updatedProduct = products.find((p) => p.id === currentProductId);
  if (!updatedProduct) return; // If product not found, do nothing

  // Update all fields in form
  updatedProduct.name = productNameInput.value;
  updatedProduct.costPrice = costPriceInput.value;
  updatedProduct.price = priceInput.value;
  updatedProduct.creditPrice = creditPriceInput.value;
  updatedProduct.quantity = parseInt(productQuantityInput.value);
  updatedProduct.brand = brandInput.value;
  updatedProduct.productCode = productCodeInput.value;
  updatedProduct.category = categoryInput.value;
  updatedProduct.unit = unitInput.value;

  // Update related fields
  updatedProduct.importPrice = updatedProduct.costPrice;
  updatedProduct.sellingPrice = updatedProduct.price;
  updatedProduct.stockQuantity = updatedProduct.quantity;
  updatedProduct.trademark = updatedProduct.brand;
  updatedProduct.productGroup = updatedProduct.category;
  updatedProduct.lastUpdated = getCurrentDateTime();

  renderProducts(products); // Re-render the product list
  editModal.style.display = "none"; // Close the modal
});

// Show add product modal when Add button is clicked
document.querySelector(".btn-action").addEventListener("click", function () {
  // Clear the form fields
  addForm.reset();

  // Reset image placeholder
  addProductImage.src = "./img/placeholder-image.png";
  addProductImage.style.opacity = "0.6";

  // Generate a new product code if auto-generate is checked
  if (autoGenerateCodeCheckbox && autoGenerateCodeCheckbox.checked) {
    addProductCodeInput.value = generateProductId();
  }

  // Show the modal
  addModal.style.display = "block"; // Show the modal
});

// Handle auto-generate checkbox change
if (autoGenerateCodeCheckbox) {
  autoGenerateCodeCheckbox.addEventListener("change", function () {
    if (this.checked) {
      addProductCodeInput.value = generateProductId();
      addProductCodeInput.readOnly = true;
    } else {
      addProductCodeInput.readOnly = false;
    }
  });
}

// Close add modal when clicking the close button
document
  .querySelector("#addModal .close")
  .addEventListener("click", function () {
    addModal.style.display = "none";
  });

// Close add modal when clicking the cancel button
document.querySelector(".btn-cancel").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form submission
  addModal.style.display = "none";
});

// Trigger file selection when clicking on image container
document
  .querySelector(".product-image-container")
  .addEventListener("click", function () {
    addImageUpload.click();
  });

// Display image preview when file is selected
addImageUpload.addEventListener("change", function (event) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      addProductImage.src = e.target.result;
      addProductImage.style.opacity = "1";
    };
    reader.readAsDataURL(event.target.files[0]);
  }
});

// Handle add product form submission
addForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Create a new product object
  const newProduct = {
    id: addProductCodeInput.value,
    name: addProductNameInput.value,
    costPrice: addCostPriceInput.value,
    price: addPriceInput.value,
    creditPrice: addCreditPriceInput.value || addPriceInput.value, // Default to price if not specified
    quantity: parseInt(addProductQuantityInput.value),
    brand: addBrandInput.value,
    category: addCategoryInput.value,
    productCode: addProductCodeInput.value,
    unit: addUnitInput.value || "chiếc",
    status: addStatusInput.value,
    image: addProductImage.src.startsWith("data:")
      ? `images/product-${addProductCodeInput.value}.jpg`
      : "./img/placeholder-image.png",
    importPrice: addCostPriceInput.value,
    sellingPrice: addPriceInput.value,
    stockQuantity: parseInt(addProductQuantityInput.value),
    trademark: addBrandInput.value,
    productGroup: addProductGroupInput.value || addCategoryInput.value,
    position: addPositionInput.value || "",
    barcode: addBarcodeInput.value || "",
    weight: addWeightInput.value || "0 g",
    lastUpdated: getCurrentDateTime(),
  };

  // Add the new product to the products array
  products.unshift(newProduct);

  // Re-render the product list and close the modal
  renderProducts(products);
  addModal.style.display = "none";

  // Show success message
  alert("Thêm sản phẩm thành công!");
});

// Close modal when clicking outside (using event delegation)
window.addEventListener("click", function (event) {
  if (event.target === editModal) {
    editModal.style.display = "none";
  }
  if (event.target === addModal) {
    addModal.style.display = "none";
  }
});

// Close edit modal when clicking close button
const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const modal = this.closest(".modal-edit, .modal-add");
    if (modal.classList.contains("modal-edit")) {
      modal.style.display = "none";
    } else if (modal.classList.contains("modal-add")) {
      modal.style.display = "none";
    }
  });
});

// Initialize the product list
renderProducts(products);
