import CartServices from "../services/cartServices.js";

export default class CartController {
  constructor() {
    this.cartServices = new CartServices();
  }

  getAll = async (req, res) => {
    try {
      const carritos = await this.cartServices.getAll();
      carritos
        ? res.status(200).json(carritos)
        : res.status(404).json({ message: "No hay carritos disponibles" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  createCart = async (req, res) => {
    try {
      const cart = req.body;
      const newCart = await this.cartServices.createCart(cart);
      res.status(201).json({ message: "Carrito creado con exito", newCart });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el carrito", error });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const id  = req.params.id;
      const cartDeleted = await this.cartServices.deleteCart(id);
      res
        .status(200)
        .json({ message: "Carrito eliminado correctamente", cartDeleted });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el carrito", error });
    }
  };

  addProductToCart = async (req, res) => {
    try {
        const carrito = await this.cartServices.getOne(req.params.id);
        const producto = req.body;
        
        if (carrito && producto) {
            const carritoUpdated = await this.cartServices.addProductToCart(carrito._id, producto);
            const newCarrito = await this.cartServices.getOne(carritoUpdated._id);
            res.status(201).json({
                message: 'Productos agregados con éxito',
                carrito: newCarrito});
        }
        if(!carrito) {
            res.status(404).json({message: 'Carrito no encontrado. id: ' + req.params.id});
        }
        if(!producto) {
            res.status(404).json({message: 'La lista de productos está vacía'});
        }
    } catch (err) {
        res.status(500).json({message: err.message, line: err.line});
    }

  }

  deleteProduct = async (req, res) => {
    try {
        const carrito = await this.cartServices.getOne(req.params.id);
        const productoId = req.params.productId;
        console.log(productoId)
        console.log(carrito)
        if (carrito && productoId) {
            const carritoUpdated = await this.cartServices.deleteProduct(req.params.id, productoId);
            const newCarrito = await this.cartServices.getOne(carritoUpdated._id);
            res.status(200).json({
                message: 'Producto eliminado con éxito',
                carrito: newCarrito});
        }
        if(!carrito) {
            res.status(404).json({message: 'Carrito no encontrado. id: ' + req.params.id});
        }
        if(!productoId) {
            res.status(404).json({message: 'El producto no existe'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
}
