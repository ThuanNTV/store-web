export class CustomerService {
  constructor() {
    this.customers = JSON.parse(localStorage.getItem("customers")) || [];
  }

  getCustomers() {
    return this.customers;
  }

  getCustomerById(id) {
    return this.customers.find((customer) => customer.id === id);
  }

  addCustomer(customer) {
    this.customers.unshift(customer);
    this._saveCustomers();
    return customer;
  }

  updateCustomer(id, updatedData) {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id
    );
    if (customerIndex !== -1) {
      this.customers[customerIndex] = {
        ...this.customers[customerIndex],
        ...updatedData,
      };
      this._saveCustomers();
      return this.customers[customerIndex];
    }
    return null;
  }

  deleteCustomer(id) {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id
    );
    if (customerIndex !== -1) {
      const deletedCustomer = this.customers.splice(customerIndex, 1)[0];
      this._saveCustomers();
      return deletedCustomer;
    }
    return null;
  }

  _saveCustomers() {
    localStorage.setItem("customers", JSON.stringify(this.customers));
  }
}
