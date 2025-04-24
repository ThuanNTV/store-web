export class EditCustomerController {
  constructor(
    customerService,
    customerListView,
    getCurrentDateTime,
    closeModal
  ) {
    this.customerService = customerService;
    this.customerListView = customerListView;
    this.getCurrentDateTime = getCurrentDateTime;
    this.closeModal = closeModal;
    this.modal = document.getElementById("editCustomerModal");
    this.form = document.getElementById("editCustomerForm");
    this.currentCustomerId = null;

    // Form inputs
    this.inputs = {
      name: document.getElementById("editCustomerName"),
      phone: document.getElementById("editCustomerPhone"),
      email: document.getElementById("editCustomerEmail"),
      address: document.getElementById("editCustomerAddress"),
      type: document.getElementById("editCustomerType"),
      notes: document.getElementById("editCustomerNotes"),
    };

    this._initEventListeners();
  }

  _initEventListeners() {
    // Handle form submission
    if (this.form) {
      this.form.addEventListener("submit", (e) => this._handleSubmit(e));
    } else {
      console.error("Form element not found");
    }

    // Handle form submission
    this.form.addEventListener("submit", (e) => this._handleSubmit(e));

    // Close modal when clicking the close button
    const closeButtons = this.modal.querySelectorAll(".close");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => this.closeModal(this.modal));
    });

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.closeModal(this.modal);
      }
    });

    // Setup edit customer event binding
    this.customerListView.bindEditCustomer((customerId) =>
      this.showEditModal(customerId)
    );
  }

  showEditModal(customerId) {
    const customer = this.customerService.getCustomerById(customerId);
    if (!customer) return;

    this.currentCustomerId = customerId;

    // Pre-fill the form with customer data
    this.inputs.name.value = customer.name;
    this.inputs.phone.value = customer.phone;
    this.inputs.email.value = customer.email || "";
    this.inputs.address.value = customer.address || "";
    this.inputs.type.value = customer.type || "regular";
    this.inputs.notes.value = customer.notes || "";

    // Show modal
    this.modal.style.display = "block";
  }

  _handleSubmit(e) {
    e.preventDefault();

    const updatedCustomer = {
      name: this.inputs.name.value,
      phone: this.inputs.phone.value,
      email: this.inputs.email.value,
      address: this.inputs.address.value,
      type: this.inputs.type.value,
      notes: this.inputs.notes.value,
      lastUpdated: this.getCurrentDateTime(),
    };

    this.customerService.updateCustomer(
      this.currentCustomerId,
      updatedCustomer
    );
    this.customerListView.renderCustomers();
    this.closeModal(this.modal);

    // Show success message
    alert("Cập nhật khách hàng thành công!");
  }
}
