export class AddCustomerController {
  constructor(
    customerService,
    customerListView,
    generateCustomerId,
    getCurrentDateTime,
    closeModal
  ) {
    this.customerService = customerService;
    this.customerListView = customerListView;
    this.generateCustomerId = generateCustomerId;
    this.getCurrentDateTime = getCurrentDateTime;
    this.closeModal = closeModal;
    this.modal = document.getElementById("addCustomerModal");
    this.form = document.getElementById("addCustomerForm");

    // Form inputs
    this.inputs = {
      name: document.getElementById("addCustomerName"),
      phone: document.getElementById("addCustomerPhone"),
      email: document.getElementById("addCustomerEmail"),
      address: document.getElementById("addCustomerAddress"),
      type: document.getElementById("addCustomerType"),
      notes: document.getElementById("addCustomerNotes"),
    };

    this._initEventListeners();
  }

  _initEventListeners() {
    // Show add customer modal when Add button is clicked
    document
      .querySelector(".btn-action")
      .addEventListener("click", () => this.showAddModal());

    // Handle form submission
    this.form.addEventListener("submit", (e) => this._handleSubmit(e));

    // Close modal with various buttons
    document
      .querySelector("#addCustomerModal .close")
      .addEventListener("click", () => {
        this.closeModal(this.modal);
      });

    document
      .querySelector(".btn-cancel-customer")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this.closeModal(this.modal);
      });

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.closeModal(this.modal);
      }
    });
  }

  showAddModal() {
    // Clear the form fields
    this.form.reset();

    // Show the modal
    this.modal.style.display = "block";
  }

  _handleSubmit(e) {
    e.preventDefault();

    // Create a new customer object
    const newCustomer = {
      id: this.generateCustomerId(this.customerService.getCustomers()),
      name: this.inputs.name.value,
      phone: this.inputs.phone.value,
      email: this.inputs.email.value,
      address: this.inputs.address.value,
      type: this.inputs.type.value,
      notes: this.inputs.notes.value,
      totalPurchase: 0,
      createdAt: this.getCurrentDateTime(),
      lastUpdated: this.getCurrentDateTime(),
    };

    // Add the new customer
    this.customerService.addCustomer(newCustomer);

    // Re-render the customer list and close the modal
    this.customerListView.renderCustomers();
    this.closeModal(this.modal);

    // Show success message
    alert("Thêm khách hàng thành công!");
  }
}
