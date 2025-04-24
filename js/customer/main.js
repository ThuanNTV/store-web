import {
  CustomerService,
  CustomerListView,
  EditCustomerController,
  AddCustomerController,
  FilterCustomerController,
  ImportExportCustomerController,
  getCurrentDateTime,
  formatCurrency,
  closeModal,
} from "./index.js";

// Generate unique customer ID
function generateCustomerId(existingCustomers) {
  const prefix = "KH";
  let maxNumber = 0;

  existingCustomers.forEach((customer) => {
    if (customer.id && customer.id.startsWith(prefix)) {
      const num = parseInt(customer.id.substring(prefix.length), 10);
      if (!isNaN(num) && num > maxNumber) {
        maxNumber = num;
      }
    }
  });

  return `${prefix}${(maxNumber + 1).toString().padStart(6, "0")}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize customer service
  const customerService = new CustomerService();

  // Create container elements if they don't exist yet
  setupCustomerUI();

  const customerContainer = document.getElementById("customer-list");
  const customerListView = new CustomerListView(
    customerContainer,
    customerService,
    formatCurrency
  );

  const editCustomerController = new EditCustomerController(
    customerService,
    customerListView,
    getCurrentDateTime,
    closeModal
  );

  const addCustomerController = new AddCustomerController(
    customerService,
    customerListView,
    generateCustomerId,
    getCurrentDateTime,
    closeModal
  );

  const filterCustomerController = new FilterCustomerController(
    customerService,
    customerListView
  );

  const importExportCustomerController = new ImportExportCustomerController(
    customerService,
    customerListView,
    formatCurrency
  );

  customerListView.bindDeleteCustomer((customerId) => {
    customerService.deleteCustomer(customerId);
    customerListView.renderCustomers();
  });

  customerListView.bindViewCustomerHistory((customerId) => {
    alert(
      `Chức năng xem lịch sử mua hàng của khách ${customerId} sẽ được phát triển sau.`
    );
  });

  // Render initial customer list
  customerListView.renderCustomers();
});

// Setup UI elements for customer management
function setupCustomerUI() {
  // Create customer management content
  const rightView = document.querySelector(".Main_view-right");
  rightView.innerHTML = `
      <div class="customer-management">
        <div class="header-actions">
          <h1>Quản lý khách hàng</h1>
          <div class="action-buttons">
            <button class="btn-action btn-add-customer">+ Thêm khách hàng</button>
            <button id="exportCustomerButton">Xuất Excel</button>
            <button id="importCustomerButton">Nhập Excel</button>
            <input type="file" id="importCustomerFileInput" accept=".xlsx, .xls" style="display: none;" />
          </div>
        </div>
        
        <div class="filter-section">
          <h2>Bộ lọc khách hàng</h2>
          <div class="filter-group">
            <label for="search-customer">🔍 Tìm kiếm khách hàng</label>
            <input type="text" id="search-customer" placeholder="Nhập tên, SĐT hoặc email..." />
          </div>
          <div class="filter-group">
            <label for="type-select">👤 Loại khách hàng</label>
            <select id="type-select">
              <option value="">Tất cả</option>
              <option value="regular">Khách thường</option>
              <option value="vip">Khách VIP</option>
              <option value="wholesale">Khách sỉ</option>
            </select>
          </div>
          <button class="btn-filter-customer">Lọc</button>
        </div>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Mã KH</th>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Tổng mua hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody id="customer-list">
              <!-- Customer data will be populated here -->
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Add Customer Modal -->
      <div id="addCustomerModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Thêm khách hàng mới</h2>
            <span class="close">&times;</span>
          </div>
          <form id="addCustomerForm">
            <div class="form-group">
              <label for="addCustomerName">Tên khách hàng <span class="required">*</span></label>
              <input type="text" id="addCustomerName" required>
            </div>
            <div class="form-group">
              <label for="addCustomerPhone">Số điện thoại <span class="required">*</span></label>
              <input type="text" id="addCustomerPhone" required>
            </div>
            <div class="form-group">
              <label for="addCustomerEmail">Email</label>
              <input type="email" id="addCustomerEmail">
            </div>
            <div class="form-group">
              <label for="addCustomerAddress">Địa chỉ</label>
              <input type="text" id="addCustomerAddress">
            </div>
            <div class="form-group">
              <label for="addCustomerType">Loại khách hàng</label>
              <select id="addCustomerType">
                <option value="regular">Khách thường</option>
                <option value="vip">Khách VIP</option>
                <option value="wholesale">Khách sỉ</option>
              </select>
            </div>
            <div class="form-group">
              <label for="addCustomerNotes">Ghi chú</label>
              <textarea id="addCustomerNotes"></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-submit">Thêm khách hàng</button>
              <button type="button" class="btn-cancel-customer">Hủy</button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Edit Customer Modal -->
      <div id="editCustomerModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Chỉnh sửa thông tin khách hàng</h2>
            <span class="close">&times;</span>
          </div>
          <form id="editCustomerForm">
            <div class="form-group">
              <label for="editCustomerName">Tên khách hàng <span class="required">*</span></label>
              <input type="text" id="editCustomerName" required>
            </div>
            <div class="form-group">
              <label for="editCustomerPhone">Số điện thoại <span class="required">*</span></label>
              <input type="text" id="editCustomerPhone" required>
            </div>
            <div class="form-group">
              <label for="editCustomerEmail">Email</label>
              <input type="email" id="editCustomerEmail">
            </div>
            <div class="form-group">
              <label for="editCustomerAddress">Địa chỉ</label>
              <input type="text" id="editCustomerAddress">
            </div>
            <div class="form-group">
              <label for="editCustomerType">Loại khách hàng</label>
              <select id="editCustomerType">
                <option value="regular">Khách thường</option>
                <option value="vip">Khách VIP</option>
                <option value="wholesale">Khách sỉ</option>
              </select>
            </div>
            <div class="form-group">
              <label for="editCustomerNotes">Ghi chú</label>
              <textarea id="editCustomerNotes"></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-submit">Cập nhật</button>
              <button type="button" class="btn-cancel">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    `;

  // Add left panel content (can be purchase history or something else customer related)
  const leftView = document.querySelector(".Main_view-left");
  leftView.innerHTML = `
      <div class="customer-stats">
        <h2>Thống kê khách hàng</h2>
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-title">Tổng số khách hàng</div>
            <div class="stat-value" id="total-customers">0</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Khách VIP</div>
            <div class="stat-value" id="vip-customers">0</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Khách thường</div>
            <div class="stat-value" id="regular-customers">0</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Khách sỉ</div>
            <div class="stat-value" id="wholesale-customers">0</div>
          </div>
        </div>
        
        <div class="recent-activity">
          <h3>Hoạt động gần đây</h3>
          <ul id="customer-activity">
            <li class="empty-activity">Không có hoạt động gần đây</li>
          </ul>
        </div>
      </div>
    `;
}
