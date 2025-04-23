const products = [
  {
    id: "1",
    name: "iPhone 16 Pro Max 256GB | Chính hãng VN/A",
    price: "29000000",
    creditPrice: "2900310000",
    quantity: 2,
    brand: "Apple",
    category: "Smartphone cao cấp",
    image: "images/iphone16promax.jpg",
    status: "inStock",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: "28000000",
    creditPrice: "28005000",
    quantity: 1,
    brand: "Samsung",
    category: "Smartphone cao cấp",
    image: "images/galaxy-s24-ultra.jpg",
    status: "inStock",
  },
  {
    id: "3",
    name: "Xiaomi Redmi Note 13 Pro 128GB",
    price: "7500000",
    creditPrice: "75530000",
    quantity: 3,
    brand: "Xiaomi",
    category: "Tầm trung",
    image: "images/redmi-note-13-pro.jpg",
    status: "inStock",
  },
  {
    id: "4",
    name: "Oppo Find X7 Pro 5G",
    price: "21000000",
    creditPrice: "543543",
    quantity: 2,
    brand: "Oppo",
    category: "Flagship",
    image: "images/oppo-find-x7-pro.jpg",
    status: "inStock",
  },
  {
    id: "5",
    name: "Google Pixel 8 Pro 256GB",
    price: "22500000",
    creditPrice: "34535345",
    quantity: 1,
    brand: "Google",
    category: "Flagship Android",
    image: "images/pixel-8-pro.jpg",
    status: "outOfStock",
  },
  {
    id: "6",
    name: "OnePlus 12 512GB",
    price: "18000000",
    creditPrice: "34554553",
    quantity: 4,
    brand: "OnePlus",
    category: "Gaming",
    image: "images/oneplus-12.jpg",
    status: "inStock",
  },
  {
    id: "7",
    name: "Vivo X100 Pro 256GB",
    price: "19500000",
    creditPrice: "34532312",
    quantity: 2,
    brand: "Vivo",
    category: "Camera Phone",
    image: "images/vivo-x100-pro.jpg",
    status: "inStock",
  },
  {
    id: "8",
    name: "Realme GT 3 256GB",
    price: "12000000",
    creditPrice: "454341231",
    quantity: 3,
    brand: "Realme",
    category: "Hiệu năng cao",
    image: "images/realme-gt3.jpg",
    status: "inStock",
  },
  {
    id: "9",
    name: "ASUS ROG Phone 8 512GB",
    price: "24500000",
    creditPrice: "45424542",
    quantity: 1,
    brand: "ASUS",
    category: "Gaming",
    image: "images/rog-phone-8.jpg",
    status: "inStock",
  },
  {
    id: "10",
    name: "Sony Xperia 1 VI 256GB",
    price: "27000000",
    creditPrice: "75245245",
    quantity: 2,
    brand: "Sony",
    category: "Multimedia",
    image: "images/xperia-1-vi.jpg",
    status: "inStock",
  },
];

let cart = [];
// Initialize with a variable that will be updated when the selector changes
let currentPriceType = "price"; // Default to regular price

// Store selected product for navbar display
let selectedProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  setupProductSearch();
  setupModalEvents();
  setupPaymentMethods();
  setupCheckout();
  setupPrintInvoice();
  setupPriceTypeSelector(); // New function to handle price type selection
  updateCartDisplay();
  renderProducts(); // Initial rendering of products
});

// Setup price type selector
function setupPriceTypeSelector() {
  const priceTypeSelector = document.getElementById("priceTypeSelector");
  if (priceTypeSelector) {
    // Set initial value
    currentPriceType = priceTypeSelector.value;

    // Add change event listener
    priceTypeSelector.addEventListener("change", () => {
      currentPriceType = priceTypeSelector.value;
      updateSelectedProductPrice(); // Update the displayed price in navbar
      renderProducts(document.getElementById("searchInput").value);
      updateCartDisplay(); // Update cart prices according to new price type
    });
  }
}

// Update the price display in the navbar
function updateSelectedProductPrice() {
  const priceDisplay = document.getElementById("selectedProductPrice");
  if (priceDisplay && selectedProduct) {
    const priceToUse =
      selectedProduct[currentPriceType] || selectedProduct.price;
    priceDisplay.textContent = formatCurrency(priceToUse);
  } else if (priceDisplay) {
    priceDisplay.textContent = "0₫";
  }
}

// Function to get the selected payment method
function getSelectedPaymentMethod() {
  const activeMethod = document.querySelector(".method-option.active");
  return activeMethod ? activeMethod.dataset.method : "cash"; // Default to cash if none selected
}

// Setup for the separate print invoice button
function setupPrintInvoice() {
  const printBtn = document.getElementById("print-invoice-btn");
  if (!printBtn) return;

  printBtn.addEventListener("click", () => {
    if (!cart.length) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng để in hóa đơn!");
      return;
    }

    const customerInfoInput = document.getElementById("customer-name");
    if (!customerInfoInput || !customerInfoInput.value.trim()) {
      alert("Vui lòng chọn khách hàng trước khi in hóa đơn.");
      return;
    }

    // Create temporary order object for printing
    const tempOrder = {
      customer: customerInfoInput.value.trim(),
      items: JSON.parse(JSON.stringify(cart)),
      total: calculateTotal(),
      paymentMethod: getSelectedPaymentMethod(),
      createdAt: new Date().toISOString(),
    };

    // Generate and print invoice without saving the order
    generateInvoicePDFWithHTML(tempOrder);
  });
}

// Setup for the payment method selection
function setupPaymentMethods() {
  const methodOptions = document.querySelectorAll(".method-option");

  methodOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Remove active class from all options
      methodOptions.forEach((opt) => opt.classList.remove("active"));

      // Add active class to clicked option
      option.classList.add("active");
    });
  });
}

function setupProductSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () =>
    renderProducts(searchInput.value)
  );
}

function renderProducts(filter = "") {
  const container = document.getElementById("product-list");
  if (!container) return;

  const keyword = filter.toLowerCase();
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );

  const fragment = document.createDocumentFragment();

  filteredProducts.forEach((p) => {
    const div = document.createElement("div");
    div.className = "card_product-item";
    div.dataset.id = p.id;

    // Use the current price type (regular or credit)
    const priceToDisplay = p[currentPriceType] || p.price;

    div.innerHTML = `
      <div class="card_product-item-image">
        <img src="${p.images || "./img/default.webp"}" alt="${p.name}" />
      </div>
      <div class="card_product-item-name">${p.name}</div>
      <div class="card_product-item-price">${formatCurrency(
        priceToDisplay
      )}</div>
    `;

    fragment.appendChild(div);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
}

// Sử dụng event delegation cho sự kiện click
document.getElementById("product-list")?.addEventListener("click", (e) => {
  const item = e.target.closest(".card_product-item");
  if (item) {
    const productId = item.dataset.id;
    const product = products.find((p) => p.id === productId);
    if (product) {
      // Update selected product for navbar display
      selectedProduct = product;
      updateSelectedProductPrice();

      // Add to cart as before
      addToCart(product);
    }
  }
});

function addToCart(product) {
  const itemIndex = cart.findIndex((i) => i.id === product.id);

  if (itemIndex >= 0) {
    cart[itemIndex].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartDisplay();
}

function updateCartDisplay() {
  const container = document.getElementById("order-items");
  if (!container) return;

  const fragment = document.createDocumentFragment();
  const itemCount = cart.length;

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "order-item";
    div.dataset.itemId = item.id;

    const isNearBottom = itemCount > 2 && i >= itemCount - 2;
    const tooltipDirection = isNearBottom ? "tooltip-top" : "tooltip-right";

    const tooltip = document.createElement("div");
    tooltip.className = `cart-tooltip ${tooltipDirection}`;
    tooltip.textContent = `Thông tin: ${item.name} - Giá nợ: ${formatCurrency(
      item[currentPriceType]
    )} - Giá bán: ${formatCurrency(item.price)}`;

    const priceToDisplay = item[currentPriceType] || item.price;

    div.append(
      createDiv("item-name", truncateText(item.name, 40)),
      createDiv("item-price", formatCurrency(priceToDisplay)),
      createQuantityControls(i, item.quantity),
      createDiv(
        "item-price-total",
        formatCurrency(priceToDisplay * item.quantity)
      ),
      createButton("Xóa", "remove-btn", () => {
        cart.splice(i, 1);
        updateCartDisplay();
      }),
      tooltip
    );

    fragment.appendChild(div);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
  updateTotal();
}

function createDiv(className, text) {
  const div = document.createElement("div");
  div.className = className;
  div.textContent = text;
  return div;
}

function createQuantityControls(index, quantity) {
  const div = document.createElement("div");
  div.className = "item-quantity";

  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.value = quantity;
  input.addEventListener("change", (e) => {
    const newValue = parseInt(e.target.value) || 1;
    updateQuantity(index, newValue);
  });

  div.append(input);

  return div;
}

function createButton(text, className, onClick) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = className.startsWith("btn-") ? className : `btn-${className}`;
  btn.addEventListener("click", onClick);
  return btn;
}

function adjustQuantity(index, delta) {
  if (index < 0 || index >= cart.length) return;

  const newQuantity = cart[index].quantity + delta;
  if (newQuantity > 0) {
    updateQuantity(index, newQuantity);
  }
}

function updateQuantity(index, newQty) {
  if (index < 0 || index >= cart.length) return;

  cart[index].quantity = parseInt(newQty) || 1;
  updateCartDisplay();
}

function calculateTotal() {
  return cart.reduce((sum, item) => {
    // Use currentPriceType for total calculation
    const priceToUse = item[currentPriceType] || item.price;
    return sum + item.quantity * parseFloat(priceToUse);
  }, 0);
}

function updateTotal() {
  const totalElement = document.getElementById("grand-total");
  if (totalElement) {
    totalElement.textContent = formatCurrency(calculateTotal());
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
}

// 💳 Thanh toán
function setupCheckout() {
  document.querySelector(".checkout-btn")?.addEventListener("click", () => {
    if (!cart.length) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng!");
      return;
    }

    const method = getSelectedPaymentMethod();
    processPayment(method);
  });
}

// 👤 Modal Khách Hàng
function setupModalEvents() {
  const modal = document.getElementById("customer-modal");
  const openBtn = document.getElementById("open-customer-modal");
  const closeBtn = document.querySelector(".close-modal");
  const saveBtn = document.getElementById("save-customer-btn");

  if (!modal || !openBtn || !closeBtn || !saveBtn) return;

  openBtn.addEventListener("click", () => (modal.style.display = "block"));
  closeBtn.addEventListener("click", () => (modal.style.display = "none"));

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  saveBtn.addEventListener("click", saveCustomer);

  // Thêm event listener cho phím Enter trong modal
  modal.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveCustomer();
      }
    });
  });
}

function saveCustomer() {
  const nameInput = document.getElementById("modal-customer-name");
  const phoneInput = document.getElementById("modal-customer-phone");

  if (!nameInput || !phoneInput) return;

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    alert("Vui lòng nhập đầy đủ thông tin khách hàng.");
    return;
  }

  const customer = { name, phone };

  try {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Kiểm tra xem khách hàng đã tồn tại chưa
    const existingIndex = customers.findIndex(
      (c) => c.phone === phone && c.name === name
    );

    if (existingIndex === -1) {
      customers.unshift(customer);
      localStorage.setItem("customers", JSON.stringify(customers));
    }

    const customerNameInput = document.getElementById("customer-name");
    if (customerNameInput) {
      customerNameInput.value = `${customer.name} - ${customer.phone}`;
    }

    const modal = document.getElementById("customer-modal");
    if (modal) {
      modal.style.display = "none";
    }

    nameInput.value = "";
    phoneInput.value = "";

    alert("Đã lưu khách hàng thành công!");
  } catch (error) {
    console.error("Lỗi khi lưu thông tin khách hàng:", error);
    alert("Có lỗi xảy ra khi lưu thông tin khách hàng!");
  }
}

// 🔁 Tiện ích debounce
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 📛 Thông báo lỗi (nếu dùng)
function showErrorToUser(msg, duration = 5000) {
  const getContainer = () => {
    let container = document.getElementById("error-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "error-container";
      container.className = "error-container";
      document.body.appendChild(container);
    }
    return container;
  };

  const container = getContainer();
  const error = document.createElement("div");
  error.className = "error-message";
  error.innerHTML = `<span class="error-text">⚠️ ${msg}</span><button class="error-close-btn">&times;</button>`;

  const closeBtn = error.querySelector(".error-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => error.remove());
  }

  const timeoutId = setTimeout(() => error.remove(), duration);
  error.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  error.addEventListener("mouseleave", () =>
    setTimeout(() => error.remove(), duration)
  );

  container.appendChild(error);
  if (container.children.length > 5) {
    container.removeChild(container.firstElementChild);
  }
}

// 💳 Xử lý thanh toán
function processPayment(method) {
  const customerInfoInput = document.getElementById("customer-name");
  if (!customerInfoInput) return;

  const customerInfo = customerInfoInput.value.trim();
  if (!customerInfo) {
    alert("Vui lòng chọn khách hàng trước khi thanh toán.");
    return;
  }

  // Create order items with the current price type
  const orderItems = cart.map((item) => {
    const priceToUse = item[currentPriceType] || item.price;
    return {
      ...item,
      price: priceToUse, // Use the current price type for order
      priceType: currentPriceType, // Store which price type was used
    };
  });

  const order = {
    customer: customerInfo,
    items: orderItems,
    total: calculateTotal(),
    paymentMethod: method,
    priceType: currentPriceType, // Store which price type was used for the order
    createdAt: new Date().toISOString(),
  };

  try {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    generateInvoicePDFWithHTML(order); // Gọi hàm in PDF

    alert("Đơn hàng đã được tạo và in hóa đơn!");

    // Reset giỏ hàng và hiển thị
    cart = [];
    updateCartDisplay();
    updateOrderDisplay(); // Hiển thị đơn hàng mới nhất
    customerInfoInput.value = "";
  } catch (error) {
    console.error("Lỗi khi xử lý thanh toán:", error);
    alert("Có lỗi xảy ra khi xử lý thanh toán!");
  }
}

// Thêm hàm updateOrderDisplay để hiển thị đơn hàng mới nhất
function updateOrderDisplay() {
  try {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const latestOrderDisplay = document.getElementById("latest-order");

    if (latestOrderDisplay && orders.length > 0) {
      const latestOrder = orders[0];

      latestOrderDisplay.innerHTML = `
        <div class="order-header">
          <h3>Đơn hàng mới nhất</h3>
          <p>Khách hàng: ${latestOrder.customer}</p>
          <p>Ngày: ${new Date(latestOrder.createdAt).toLocaleString(
            "vi-VN"
          )}</p>
          <p>Tổng tiền: ${formatCurrency(latestOrder.total)}</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("Lỗi khi hiển thị đơn hàng mới nhất:", error);
  }
}

// in hóa đơn PDF
async function generateInvoicePDFWithHTML(order) {
  // Kiểm tra xem html2pdf đã được tải chưa
  if (!window.html2pdf) {
    console.error("Thư viện html2pdf chưa được tải!");
    alert(
      "Không thể tạo hóa đơn PDF. Vui lòng kiểm tra kết nối internet và thử lại."
    );
    return;
  }

  try {
    const { html2pdf } = window;
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    // Tạo nội dung HTML
    const content = document.createElement("div");
    content.innerHTML = `
      <div style="font-family: 'Roboto', sans-serif; padding: 20px;">
        <div style="background-color: rgb(41, 128, 185); color: white; padding: 20px; text-align: center;">
          <h1>HÓA ĐƠN BÁN HÀNG</h1>
          <p>Công ty TNHH Thương mại XYZ</p>
          <p>Mã số thuế: 0123456789</p>
        </div>
        
        <!-- Thông tin đơn hàng -->
        <div style="display: flex; margin-top: 20px;">
          <div style="flex: 1;">
            <p><strong>Khách hàng:</strong> ${order.customer}</p>
            <p><strong>Địa chỉ:</strong> ${order.address || "---"}</p>
            <p><strong>Số điện thoại:</strong> ${order.phone || "---"}</p>
          </div>
          <div style="flex: 1; text-align: right;">
            <p><strong>Mã hóa đơn:</strong> ${invoiceNumber}</p>
            <p><strong>Ngày tạo:</strong> ${new Date(
              order.createdAt
            ).toLocaleDateString("vi-VN")}</p>
            <p><strong>Giờ tạo:</strong> ${new Date(
              order.createdAt
            ).toLocaleTimeString("vi-VN")}</p>
            <p><strong>Phương thức:</strong> ${getPaymentMethodName(
              order.paymentMethod
            )}</p>
          </div>
        </div>
        
        <hr style="margin: 20px 0; border: 1px solid #eee;">
        
        <!-- Bảng sản phẩm -->
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: rgb(44, 62, 80); color: white;">
              <th style="padding: 10px; text-align: left;">Sản phẩm</th>
              <th style="padding: 10px; text-align: center;">Số lượng</th>
              <th style="padding: 10px; text-align: center;">Đơn giá</th>
              <th style="padding: 10px; text-align: right;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item, index) => `
              <tr style="background-color: ${
                index % 2 === 0 ? "#f9f9f9" : "white"
              };">
                <td style="padding: 10px;">${item.name}</td>
                <td style="padding: 10px; text-align: center;">${
                  item.quantity
                }</td>
                <td style="padding: 10px; text-align: center;">${formatCurrency(
                  item.price
                )}</td>
                <td style="padding: 10px; text-align: right;">${formatCurrency(
                  parseFloat(item.price) * item.quantity
                )}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        
        <!-- Tổng cộng -->
        <div style="margin-top: 20px; text-align: right;">
          <p><strong>Tổng số lượng:</strong> ${order.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          )}</p>
          ${
            order.discount
              ? `<p><strong>Giảm giá:</strong> ${formatCurrency(
                  order.discount
                )}</p>`
              : ""
          }
          ${
            order.tax
              ? `<p><strong>Thuế:</strong> ${formatCurrency(order.tax)}</p>`
              : ""
          }
          <div style="background-color: rgb(41, 128, 185); color: white; padding: 10px; margin-top: 10px;">
            <strong>TỔNG THANH TOÁN: ${formatCurrency(order.total)}</strong>
          </div>
        </div>
        
        <!-- Ghi chú -->
        <div style="margin-top: 30px;">
          <p><strong>Ghi chú:</strong></p>
          <p>${
            order.notes ||
            "Cảm ơn quý khách đã mua hàng tại cửa hàng chúng tôi!"
          }</p>
        </div>
        
        <!-- Chữ ký -->
        <div style="display: flex; margin-top: 50px;">
          <div style="flex: 1; text-align: center;">
            <div style="border-top: 1px solid #000; display: inline-block; width: 150px; margin-bottom: 10px;"></div>
            <p>Người mua hàng</p>
          </div>
          <div style="flex: 1; text-align: center;">
            <div style="border-top: 1px solid #000; display: inline-block; width: 150px; margin-bottom: 10px;"></div>
            <p>Người bán hàng</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 50px; text-align: center; font-size: 10px; color: #999;">
          <p>Trang 1 / 1 - In ngày ${new Date().toLocaleDateString("vi-VN")}</p>
        </div>
      </div>
    `;

    // Cấu hình HTML2PDF
    const options = {
      margin: 10,
      filename: `HoaDon_${invoiceNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Tạo PDF từ HTML
    await html2pdf().from(content).set(options).save();
  } catch (error) {
    console.error("Lỗi khi tạo hóa đơn PDF:", error);
    alert("Có lỗi xảy ra khi tạo hóa đơn PDF!");
  }
}

// Hàm lấy tên phương thức thanh toán từ ID
function getPaymentMethodName(methodId) {
  const methods = {
    cash: "Tiền mặt",
    transfer: "Chuyển khoản",
    partial: "Trả một phần",
    credit: "Ghi nợ",
    "payment-cash": "Tiền mặt",
    "payment-card": "Thẻ ngân hàng",
    "payment-momo": "Ví MoMo",
    "payment-vnpay": "VNPay",
    "payment-transfer": "Chuyển khoản",
  };

  return methods[methodId] || methodId;
}

// Hàm hỗ trợ cắt văn bản dài
function truncateText(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}
