import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  categoria: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("products", productSchema);
