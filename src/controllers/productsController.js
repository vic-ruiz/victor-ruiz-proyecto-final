import ProductsServices from "../services/productsServices.js";

export default class ProductsController {
  constructor() {
    this.productsServices = new ProductsServices();
  }

  getProducts = async (req, res) => {
    try {
      const products = await this.productsServices.getAll();
      products
        ? res.status(200).json(products)
        : res.status(404).json({ message: "No products available" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getProductsByCategory = async (req, res) => {
    try {
      const categoria = req.params.categoria;
      const products = await this.productsServices.getProductsByCategory(
        categoria
      );
      products
        ? res.status(200).json(products)
        : res
            .status(404)
            .json({ message: "No products available in this category" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const id = req.params.id;
      const product = await this.productsServices.getProductById(id);
      product
        ? res.status(200).json(product)
        : res.status(404).json({ message: "Product not found. id: " + id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  createProduct = async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = await this.productsServices.createProduct(productData);
      res.status(201).json({
        message: "Product created",
        product: newProduct,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const deletedProduct = await this.productsServices.deleteProduct(id);
      res.json({
        message: "Product deleted",
        id: deletedProduct._id,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const productData = req.body;
      const updatedProduct = await this.productsServices.updateProduct(
        id,
        productData
      );
      res.json({
        message: "Product updated",
        id: updatedProduct._id,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
