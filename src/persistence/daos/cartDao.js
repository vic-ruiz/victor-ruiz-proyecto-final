import Carts from "../models/CartSchema.js";

export default class CartDao {
  constructor() {
    this.cartsModel = Carts;
  }

  async getAll() {
    try {
      const carts = await this.cartsModel.find({}).populate({
        path: "productos",
        populate: { path: "_id", model: "products" },
      });
      return carts;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async getOne(id) {
    try {
      const one = await this.cartsModel.findById(id).populate({
        path: "productos",
        populate: { path: "_id", model: "products" },
      });
      return one;
    } catch (err) {
      throw new Error("error: ", error);
    }
  }

  async createCart(cartData) {
    try {
      const newCart = await this.cartsModel.create(cartData);
      return newCart;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async deleteCart(id) {
    try {
      const deletedCart = await this.cartsModel.findByIdAndDelete(id);
      return deletedCart;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async addProductToCart(id, products) {
    try {
      const newCart = { productos: [] };
      for (let i = 0; i < products.length; i++) {
        newCart.productos.push(products[i]);
      }
      const updatedCart = await this.cartsModel.findByIdAndUpdate(id, newCart);
      return updatedCart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProduct (id, products) {
    try {
      const newCart = { productos: [] };
      for (let i = 0; i < products.length; i++) {
        newCart.productos.push(products[i]);
      }
      const updatedCart = await this.cartsModel.findByIdAndUpdate(id, newCart);
      return updatedCart
    } catch (error) {
      throw new Error("No se pudo eliminar el producto", error);
    }
  };
}
