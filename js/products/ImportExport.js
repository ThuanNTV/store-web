export class ImportExportController {
  constructor(productService, productListView, formatCurrency) {
    this.productService = productService;
    this.productListView = productListView;
    this.formatCurrency = formatCurrency;
    this.exportButton = document.getElementById("exportButton");
    this.importButton = document.getElementById("importButton");
    this.importFileInput = document.getElementById("importFileInput");
    this.importExcelFileInput = document.getElementById("importExcelFileInput");

    this._initEventListeners();
  }

  _initEventListeners() {
    // Xử lý sự kiện khi click vào nút xuất Excel
    this.exportButton.addEventListener("click", () => this.exportProducts());

    // Xử lý sự kiện khi click vào nút nhập
    this.importButton.addEventListener("click", () => {
      // Mở dialog chọn file
      this.importExcelFileInput.click();
    });

    // Xử lý sự kiện khi đã chọn file Excel
    this.importExcelFileInput.addEventListener("change", () =>
      this.importProducts()
    );

    // Xử lý sự kiện khi đã chọn file JSON (nếu cần)
    this.importFileInput.addEventListener("change", () =>
      this.importJSONProducts()
    );
  }

  exportProducts() {
    console.log("Exporting products...");
    const products = this.productService.getProducts();

    // Kiểm tra xem có dữ liệu sản phẩm không
    if (!products || products.length === 0) {
      alert("Không có sản phẩm để xuất!");
      return;
    }

    // Tạo một danh sách sản phẩm đã được định dạng
    const formattedProducts = products.map((product) => ({
      "Mã sản phẩm": product.productCode || product.id,
      "Tên sản phẩm": product.name,
      "Giá nhập": this.formatCurrency(product.costPrice || product.importPrice),
      "Giá bán": this.formatCurrency(product.price || product.sellingPrice),
      "Giá tín dụng": this.formatCurrency(product.creditPrice),
      "Số lượng": product.quantity || product.stockQuantity,
      "Thương hiệu": product.brand || product.trademark,
      "Danh mục": product.category,
      "Nhóm sản phẩm": product.productGroup || product.category,
      "Đơn vị": product.unit || "chiếc",
      "Vị trí": product.position || "",
      "Cập nhật lần cuối": product.lastUpdated || new Date().toLocaleString(),
    }));

    try {
      // Tạo một workbook mới
      const workbook = XLSX.utils.book_new();

      // Chuyển đổi JSON thành worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedProducts);

      // Thêm worksheet vào workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sản phẩm");

      // Đặt tên file với ngày tháng hiện tại
      const date = new Date();
      const fileName = `danh-sach-san-pham-${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}.xlsx`;

      // Xuất file Excel
      XLSX.writeFile(workbook, fileName);

      console.log("Export successful!");
    } catch (error) {
      console.error("Lỗi khi xuất Excel:", error);
      alert("Có lỗi xảy ra khi xuất danh sách sản phẩm. Vui lòng thử lại!");
    }
  }

  importProducts() {
    const file = this.importExcelFileInput.files[0];
    if (!file) {
      alert("Vui lòng chọn tệp Excel để nhập.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Lấy worksheet đầu tiên
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        // Chuyển đổi dữ liệu Excel thành JSON
        const products = XLSX.utils.sheet_to_json(worksheet);

        if (products.length === 0) {
          alert("Không có dữ liệu sản phẩm trong file Excel!");
          return;
        }

        // Xử lý và thêm sản phẩm
        const formattedProducts = products.map((row) => ({
          id: row["Mã sản phẩm"] || this.generateProductId(),
          name: row["Tên sản phẩm"] || "Sản phẩm không tên",
          costPrice: this.parsePrice(row["Giá nhập"]),
          price: this.parsePrice(row["Giá bán"]),
          creditPrice: this.parsePrice(row["Giá tín dụng"] || row["Giá bán"]),
          quantity: parseInt(row["Số lượng"] || 0),
          brand: row["Thương hiệu"] || "",
          category: row["Danh mục"] || "",
          productGroup: row["Nhóm sản phẩm"] || row["Danh mục"] || "",
          unit: row["Đơn vị"] || "chiếc",
          position: row["Vị trí"] || "",
          productCode: row["Mã sản phẩm"] || this.generateProductId(),
          importPrice: this.parsePrice(row["Giá nhập"]),
          sellingPrice: this.parsePrice(row["Giá bán"]),
          stockQuantity: parseInt(row["Số lượng"] || 0),
          trademark: row["Thương hiệu"] || "",
          lastUpdated: new Date().toLocaleString(),
        }));

        // Kiểm tra dữ liệu trước khi thêm
        const invalidProducts = formattedProducts.filter(
          (p) => !p.name || isNaN(p.price) || p.price <= 0
        );
        if (invalidProducts.length > 0) {
          alert(
            `Có ${invalidProducts.length} sản phẩm không hợp lệ. Vui lòng kiểm tra dữ liệu.`
          );
          console.error("Các sản phẩm không hợp lệ:", invalidProducts);
          return;
        }

        formattedProducts.forEach((product) => {
          this.productService.addProduct(product);
        });

        // Làm mới dữ liệu hiển thị
        this.productListView.renderProducts();

        // Reset input file để có thể nhập lại file cùng tên
        this.importExcelFileInput.value = "";

        alert(`Nhập ${formattedProducts.length} sản phẩm thành công!`);
      } catch (error) {
        console.error("Lỗi khi nhập dữ liệu Excel:", error);
        alert(
          "Có lỗi xảy ra khi đọc file Excel. Vui lòng kiểm tra định dạng file!"
        );
      }
    };
    reader.readAsArrayBuffer(file);
  }

  // Phương thức nhập từ file JSON (giữ lại để tương thích)
  importJSONProducts() {
    const file = this.importFileInput.files[0];
    if (!file) {
      alert("Vui lòng chọn tệp JSON để nhập.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const products = JSON.parse(data);

        if (!Array.isArray(products) || products.length === 0) {
          alert("Không có dữ liệu sản phẩm hợp lệ trong file JSON!");
          return;
        }

        products.forEach((product) => {
          this.productService.addProduct(product);
        });

        this.productListView.renderProducts();

        // Reset input file để có thể nhập lại file cùng tên
        this.importFileInput.value = "";

        alert(`Nhập ${products.length} sản phẩm thành công!`);
      } catch (error) {
        console.error("Lỗi khi nhập dữ liệu JSON:", error);
        alert("File không đúng định dạng JSON. Vui lòng kiểm tra lại!");
      }
    };
    reader.readAsText(file);
  }

  // Hàm hỗ trợ chuyển đổi giá tiền từ định dạng hiển thị sang số
  parsePrice(priceString) {
    if (!priceString) return 0;
    return parseFloat(priceString.toString().replace(/[^\d]/g, ""));
  }

  // Hàm tạo mã sản phẩm mới nếu không có
  generateProductId() {
    return (
      "SP" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
    );
  }
}
