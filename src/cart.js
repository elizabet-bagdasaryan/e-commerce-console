import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export async function getCartProdById(productId) {
  try {
    const cartProduct = await CartItem.findOne({ productId });
    return cartProduct;
  } catch (error) {
    console.error("Error finding cart product:", error);
    return null;
  }
}

export async function addToCart(productId, quantity, price) {
  try {
    const cartProduct = await CartItem.findOne({ productId });
    if (cartProduct) {
      cartProduct.quantity += quantity;
      await cartProduct.save();
    } else {
      const newCartItem = new CartItem({ productId, quantity, price });
      await newCartItem.save();
    }
  } catch (error) {
    console.error("Error adding product to the cart:", error);
  }
}

export async function order(productId, quantity) {
  try {
    const cartProduct = await CartItem.findOne({ productId });
    if (!cartProduct || cartProduct.quantity < quantity) {
      console.log("Not enough quantity in the cart");
      return;
    }
    cartProduct.quantity -= quantity;
    await cartProduct.save();
  } catch (error) {
    console.error("Error placing order:", error);
  }
}

export function getCartQuantity(productId) {
  const cartProduct = getCartProdById(productId);
  return cartProduct ? cartProduct.quantity : 0;
}

export async function avgPrice(productId) {
  const cartProduct = await getCartProdById(productId);

  if (!cartProduct || cartProduct.quantity === 0) {
    return 0;
  }

  const totalPrice = cartProduct.quantity * cartProduct.price;
  const totalQuant = cartProduct.quantity;
  return totalPrice / totalQuant;
}

export async function getFewestProd() {
  try {
    const fewestProduct = await CartItem.findOne().sort("quantity").limit(1);
    return fewestProduct;
  } catch (error) {
    console.error("Error finding fewest product:", error);
    return null;
  }
}

export async function getMostPopularProd() {
  try {
    const mostPopularProduct = await CartItem.findOne()
      .sort("-quantity")
      .limit(1);
    return mostPopularProduct;
  } catch (error) {
    console.error("Error finding most popular product:", error);
    return null;
  }
}
