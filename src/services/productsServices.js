import ProductsDao from "../persistence/daos/productsDao.js";

export default class ProductsServices {
  constructor() {
    this.productsDao = new ProductsDao();
  }

  async getAll() {
    try {
      const products = await this.productsDao.getAll();
      return products;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }
  
  async getProductsByCategory(categoria) {
    try {
      const productsByCategory = await this.productsDao.getProductsByCategory(
        categoria
      );
      return productsByCategory;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async getProductById(id) {
    try {
      const productSelected = await this.productsDao.getProductById(id);
      return productSelected;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async createProduct(producto) {
    try {
      const productCreated = await this.productsDao.createProduct(producto);
      return productCreated;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async deleteProduct(id) {
    try {
      const productDeleted = await this.productsDao.deleteProductbyId(id);
      return productDeleted;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async updateProduct(id, producto) {
    try {
      const productUpdated = await this.productsDao.updateProductById(
        id,
        producto
      );
      return productUpdated;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }
}
