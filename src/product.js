import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  id: { type: String, required: true, unique: true },
});

const Product = mongoose.model("Product", productSchema);

export async function getProdById(productId) {
  try {
    const product = await Product.findOne({ id: productId });
    return product;
  } catch (error) {
    console.error("Error fetching product from the database:", error);
    return null;
  }
}

export async function saveProduct(name, price, id) {
  try {
    await Product.updateOne({ id }, { name, price }, { upsert: true });
  } catch (error) {
    console.error("Error saving product to the database:", error);
  }
}
