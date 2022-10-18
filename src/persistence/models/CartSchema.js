import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  date: {
    type: String,
    require: true,
    trim: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      cantidad: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

export default mongoose.model("carts", cartSchema);
