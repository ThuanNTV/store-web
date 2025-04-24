export class FilterCustomerController {
  constructor(customerService, customerListView) {
    this.customerService = customerService;
    this.customerListView = customerListView;
    this.originalCustomers = [];

    // Filter elements
    this.searchInput = document.getElementById("search-customer");
    this.typeSelect = document.getElementById("type-select");
    this.filterButton = document.querySelector(".btn-filter-customer");

    this._initEventListeners();
  }

  _initEventListeners() {
    // Store original customers on initial load
    this.originalCustomers = [...this.customerService.getCustomers()];

    // Filter on button click
    this.filterButton.addEventListener("click", () => this.applyFilters());

    // Optional: Real-time filtering on search input
    this.searchInput.addEventListener("input", () => this.applyFilters());

    // Optional: Real-time filtering on type change
    this.typeSelect.addEventListener("change", () => this.applyFilters());
  }

  applyFilters() {
    // Get filter values
    const searchTerm = this.searchInput.value.toLowerCase().trim();
    const typeFilter = this.typeSelect.value;

    // Always start with full customer list
    const allCustomers = this.customerService.getCustomers();

    // Apply filters
    const filteredCustomers = allCustomers.filter((customer) => {
      // Search by name, phone, or email
      const matchesSearch =
        searchTerm === "" ||
        customer.name.toLowerCase().includes(searchTerm) ||
        (customer.phone && customer.phone.includes(searchTerm)) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm));

      // Filter by customer type
      const matchesType = typeFilter === "" || customer.type === typeFilter;

      // Customer matches all filters
      return matchesSearch && matchesType;
    });

    // Update the customer list UI with filtered results
    this.renderFilteredCustomers(filteredCustomers);
  }

  renderFilteredCustomers(customers) {
    // Update the container with filtered customers
    const customerContainer = document.getElementById("customer-list");
    customerContainer.innerHTML = "";

    if (customers.length === 0) {
      // Display message when no customers match filters
      const noResultsRow = document.createElement("tr");
      noResultsRow.innerHTML = `
          <td colspan="6" class="no-results">Không tìm thấy khách hàng nào phù hợp với bộ lọc</td>
        `;
      customerContainer.appendChild(noResultsRow);
    } else {
      // Render filtered customers
      customers.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.email || "-"}</td>
            <td>${this.customerListView.formatCurrency(
              customer.totalPurchase || 0
            )}</td>
            <td>
              <button class="btn-edit" data-id="${customer.id}">✏️</button>
              <button class="btn-delete" data-id="${customer.id}">🗑️</button>
              <button class="btn-view-history" data-id="${
                customer.id
              }">📋</button>
            </td>
          `;
        customerContainer.appendChild(row);
      });
    }
  }

  resetFilters() {
    // Clear all filter inputs
    this.searchInput.value = "";
    this.typeSelect.value = "";

    // Restore original customer list
    this.customerListView.renderCustomers();
  }
}
