export class ImportExportCustomerController {
  constructor(customerService, customerListView, formatCurrency) {
    this.customerService = customerService;
    this.customerListView = customerListView;
    this.formatCurrency = formatCurrency;
    this.exportButton = document.getElementById("exportCustomerButton");
    this.importButton = document.getElementById("importCustomerButton");
    this.importFileInput = document.getElementById("importCustomerFileInput");

    this._initEventListeners();
  }

  _initEventListeners() {
    // Handle export button click
    this.exportButton.addEventListener("click", () => this.exportCustomers());

    // Handle import button click
    this.importButton.addEventListener("click", () => {
      // Open file dialog
      this.importFileInput.click();
    });

    // Handle file selection
    this.importFileInput.addEventListener("change", () =>
      this.importCustomers()
    );
  }

  exportCustomers() {
    const customers = this.customerService.getCustomers();

    if (!customers || customers.length === 0) {
      alert("Không có khách hàng để xuất!");
      return;
    }

    // Format customer data for export
    const formattedCustomers = customers.map((customer) => ({
      "Mã khách hàng": customer.id,
      "Tên khách hàng": customer.name,
      "Số điện thoại": customer.phone,
      Email: customer.email || "",
      "Địa chỉ": customer.address || "",
      "Loại khách hàng": customer.type || "Thường",
      "Tổng tiền mua hàng": this.formatCurrency(customer.totalPurchase || 0),
      "Ghi chú": customer.notes || "",
      "Ngày tạo": customer.createdAt,
      "Cập nhật lần cuối": customer.lastUpdated,
    }));

    try {
      // Create new workbook
      const workbook = XLSX.utils.book_new();

      // Convert JSON to worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedCustomers);

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Khách hàng");

      // Set filename with current date
      const date = new Date();
      const fileName = `danh-sach-khach-hang-${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}.xlsx`;

      // Export Excel file
      XLSX.writeFile(workbook, fileName);

      console.log("Export successful!");
    } catch (error) {
      console.error("Lỗi khi xuất Excel:", error);
      alert("Có lỗi xảy ra khi xuất danh sách khách hàng. Vui lòng thử lại!");
    }
  }

  importCustomers() {
    const file = this.importFileInput.files[0];
    if (!file) {
      alert("Vui lòng chọn tệp Excel để nhập.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        // Convert Excel data to JSON
        const customers = XLSX.utils.sheet_to_json(worksheet);

        if (customers.length === 0) {
          alert("Không có dữ liệu khách hàng trong file Excel!");
          return;
        }

        // Process and add customers
        const formattedCustomers = customers.map((row) => ({
          id: row["Mã khách hàng"] || this.generateCustomerId(),
          name: row["Tên khách hàng"] || "Khách hàng không tên",
          phone: row["Số điện thoại"] || "",
          email: row["Email"] || "",
          address: row["Địa chỉ"] || "",
          type: row["Loại khách hàng"] || "regular",
          totalPurchase: this.parsePrice(row["Tổng tiền mua hàng"] || 0),
          notes: row["Ghi chú"] || "",
          createdAt: row["Ngày tạo"] || new Date().toLocaleString(),
          lastUpdated: new Date().toLocaleString(),
        }));

        // Check data validity
        const invalidCustomers = formattedCustomers.filter(
          (c) => !c.name || !c.phone
        );
        if (invalidCustomers.length > 0) {
          alert(
            `Có ${invalidCustomers.length} khách hàng không hợp lệ. Vui lòng kiểm tra dữ liệu.`
          );
          return;
        }

        formattedCustomers.forEach((customer) => {
          this.customerService.addCustomer(customer);
        });

        // Refresh display
        this.customerListView.renderCustomers();

        // Reset input file
        this.importFileInput.value = "";

        alert(`Nhập ${formattedCustomers.length} khách hàng thành công!`);
      } catch (error) {
        console.error("Lỗi khi nhập dữ liệu Excel:", error);
        alert(
          "Có lỗi xảy ra khi đọc file Excel. Vui lòng kiểm tra định dạng file!"
        );
      }
    };
    reader.readAsArrayBuffer(file);
  }

  // Helper function to parse price from formatted string
  parsePrice(priceString) {
    if (!priceString) return 0;
    return parseFloat(priceString.toString().replace(/[^\d]/g, ""));
  }

  // Generate customer ID if none exists
  generateCustomerId() {
    return (
      "KH" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
    );
  }
}
