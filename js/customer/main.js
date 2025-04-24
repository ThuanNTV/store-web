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
