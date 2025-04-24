export class CustomerListView {
  constructor(containerElement, customerService, formatCurrency) {
    this.containerElement = containerElement;
    this.customerService = customerService;
    this.formatCurrency = formatCurrency;
  }

  renderCustomers() {
    const customers = this.customerService.getCustomers();
    this.containerElement.innerHTML = "";

    customers.forEach((customer) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.phone}</td>
          <td>${customer.email || "-"}</td>
          <td>${this.formatCurrency(customer.totalPurchase || 0)}</td>
          <td>
            <button class="btn-edit" data-id="${customer.id}">✏️</button>
            <button class="btn-delete" data-id="${customer.id}">🗑️</button>
            <button class="btn-view-history" data-id="${
              customer.id
            }">📋</button>
          </td>
        `;
      this.containerElement.appendChild(row);
    });
  }

  bindEditCustomer(handler) {
    this.containerElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-edit")) {
        const customerId = event.target.getAttribute("data-id");
        handler(customerId);
      }
    });
  }

  bindDeleteCustomer(handler) {
    this.containerElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-delete")) {
        const customerId = event.target.getAttribute("data-id");
        if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
          handler(customerId);
        }
      }
    });
  }

  bindViewCustomerHistory(handler) {
    this.containerElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-view-history")) {
        const customerId = event.target.getAttribute("data-id");
        handler(customerId);
      }
    });
  }
}
