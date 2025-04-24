export class ProductService {
  constructor() {
    this.products = JSON.parse(localStorage.getItem("products")) || [];
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product) {
    this.products.unshift(product);
    this._saveProducts();
    return product;
  }

  updateProduct(id, updatedData) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedData,
      };
      this._saveProducts();
      return this.products[productIndex];
    }
    return null;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1)[0];
      this._saveProducts();
      return deletedProduct;
    }
    return null;
  }

  _saveProducts() {
    localStorage.setItem("products", JSON.stringify(this.products));
  }
}
