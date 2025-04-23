const products = [
  {
    id: "1",
    name: "iPhone 16 Pro Max 256GB | Chính hãng VN/A",
    price: "25000000",
    quantity: 2,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: "28000000",
    quantity: 1,
  },
  {
    id: "3",
    name: "Xiaomi Redmi Note 13 Pro 128GB",
    price: "7500000",
    quantity: 3,
  },
  {
    id: "4",
    name: "Oppo Find X7 Pro 5G",
    price: "21000000",
    quantity: 2,
  },
  {
    id: "5",
    name: "Google Pixel 8 Pro 256GB",
    price: "22500000",
    quantity: 1,
  },
  {
    id: "6",
    name: "OnePlus 12 512GB",
    price: "18000000",
    quantity: 4,
  },
  {
    id: "7",
    name: "Vivo X100 Pro 256GB",
    price: "19500000",
    quantity: 2,
  },
  {
    id: "8",
    name: "Realme GT 3 256GB",
    price: "12000000",
    quantity: 3,
  },
  {
    id: "9",
    name: "ASUS ROG Phone 8 512GB",
    price: "24500000",
    quantity: 1,
  },
  {
    id: "10",
    name: "Sony Xperia 1 VI 256GB",
    price: "27000000",
    quantity: 2,
  },
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  setupProductSearch();
  setupModalEvents();
  setupCheckout();
  renderProducts();
  updateCartDisplay();
});

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

  // Sử dụng DocumentFragment để giảm thiểu reflow
  const fragment = document.createDocumentFragment();

  filteredProducts.forEach((p) => {
    const div = document.createElement("div");
    div.className = "card_product-item";
    div.dataset.id = p.id;

    div.innerHTML = `
      <div class="card_product-item-image">
        <img src="${p.image || "../img/default.webp"}" alt="${p.name}" />
      </div>
      <div class="card_product-item-name">${p.name}</div>
      <div class="card_product-item-price">${formatCurrency(p.price)}</div>
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

  // Sử dụng DocumentFragment để cải thiện hiệu suất
  const fragment = document.createDocumentFragment();

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "order-item";
    div.dataset.itemId = item.id;

    div.append(
      createDiv("item-name", truncateText(item.name, 40)),
      createDiv("item-price", formatCurrency(item.price)),
      createQuantityControls(i, item.quantity),
      createDiv(
        "item-price-total",
        formatCurrency(parseFloat(item.price) * item.quantity)
      ),
      createButton("Xóa", "remove-btn", () => {
        cart.splice(i, 1);
        updateCartDisplay();
      })
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

  div.append(
    createButton(
      "-",
      "decrement",
      debounce(() => adjustQuantity(index, -1), 200)
    ),
    input,
    createButton(
      "+",
      "increment",
      debounce(() => adjustQuantity(index, 1), 200)
    )
  );

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
  return cart.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price),
    0
  );
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

    const method = document.querySelector('input[name="payment"]:checked')?.id;
    if (!method) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

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

  const order = {
    customer: customerInfo,
    items: JSON.parse(JSON.stringify(cart)), // Deep copy để tránh tham chiếu
    total: calculateTotal(),
    paymentMethod: method,
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
