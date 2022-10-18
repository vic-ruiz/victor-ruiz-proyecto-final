import CartDao from "../persistence/daos/cartDao.js";

export default class CartServices {
  constructor() {
    this.cartDao = new CartDao();
  }

  async getAll() {
    try {
      const all = await this.cartDao.getAll();
      if (all.length === 0) {
        return "No existe ningún carrito";
      }
      return all;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async getOne(id) {
    try {
      const one = await this.cartDao.getOne(id);
      return one;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createCart(cartData) {
    try {
      const cartDataImput = {
        date: new Date().toString(),
        userEmail: cartData.userEmail.toLowerCase(),
        products: [],
      };
      const newCart = await this.cartDao.createCart(cartDataImput);
      return newCart;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async deleteCart(id) {
    try {
      return await this.cartDao.deleteCart(id);
    } catch (error) {
      console.log(error);
      throw new Error("Error al eliminar el carrito");
    }
  }

  async addProductToCart(id, product) {
    try {
      const one = await this.cartDao.getOne(id);
      const productFound = one.productos.find(
        (prod) => prod._id._id == product._id
      );

      if (productFound) {
        productFound.cantidad++;
      } else {
        one.productos.push(product);
      }
      const newCart = await this.cartDao.addProductToCart(id, one.productos);
      return newCart;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async deleteProduct(id, productId) {
    try {
      console.log(id)
      const one = await this.cartDao.getOne(id);
      if (one) {
        const i = one.productos.findIndex((prod) => prod._id._id == productId);
        console.log(i)
        if (i >= 0) {
          one.productos.splice(i, 1);
          console.log(one.productos)
          const newCart = await this.cartDao.deleteProduct(id, one.productos);
          return newCart;
        } else {
          const message =
            "No se pudo encontrar el producto a eliminar dentro del carrito";
          return message;
        }
      } else {
        const message =
          "No se pudo encontrar encontrar el carrito con el ID indicado";
        return message;
      }
    } catch (error) {
      throw new Error("error: ", error);
    }
  }
}
