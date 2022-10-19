import Products from "../models/ProductsSchema.js";

export default class ProductsDao {
  constructor() {
    this.productsModel = Products;
  }
  
  async getAll() {
    try {
      const products = await this.productsModel.find({});
      console.log(products)
      return products;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async getProductsByCategory(categoria) {
    try {
      const productsByCategory = await this.productsModel.find({ categoria });
      return productsByCategory;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async getProductById(id) {
    try {
      const productById = await this.productsModel.findById(id);
      return productById;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async createProduct(producto) {
    try {
      const productCreated = await this.productsModel.create(producto);
      return productCreated;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async deleteProductbyId(id) {
    try {
      const deletedProduct = await this.productsModel.findByIdAndDelete(id);
      return deletedProduct;
    } catch (err) {
      console.log("error: ", error);
    }
  }

  async updateProductById(id, producto) {
    try {
      const updatedProduct = await this.productsModel.findByIdAndUpdate(id, producto);
      return updatedProduct;
    } catch (err) {
      console.log("error: ", error);
    }
  }
}
