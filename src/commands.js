import readline from "readline-sync";
import { saveProduct, getProdById } from "./product.js";
import {
  addToCart,
  order,
  getCartProdById,
  avgPrice,
  getFewestProd,
  getMostPopularProd,
} from "./cart.js";

export async function saveProductCommand() {
  const name = readline.question("Enter the product name: ");
  const price = parseFloat(readline.question("Enter the product price: "));
  const id = readline.question("Enter the product ID: ");

  await saveProduct(name, price, id);

  return "Product saved successfully!";
}

export async function purchaseProductCommand() {
  const quantity = parseInt(readline.question("Enter the quantity: "));
  const price = parseFloat(readline.question("Enter the price: "));
  const productId = readline.question("Enter the product ID: ");

  await addToCart(productId, quantity, price);

  return "Product added to the cart!";
}

export async function orderProductCommand() {
  const quantity = parseInt(readline.question("Enter the quantity: "));
  const productId = readline.question("Enter the product ID: ");

  await order(productId, quantity);

  return "Order placed successfully!";
}

export async function getQuantityCommand() {
  const productId = readline.question("Enter the product ID: ");
  const cartProduct = await getCartProdById(productId);

  if (cartProduct) {
    const quantity = cartProduct.quantity;
    return `Quantity: ${quantity}`;
  } else {
    return "Product not found in the cart.";
  }
}

export async function averagePriceCommand() {
  const productId = readline.question("Enter the product ID: ");
  const averagePrice = await avgPrice(productId);

  return `Average price: ${averagePrice}`;
}

export async function profitCommand() {
  const productId = readline.question("Enter the product ID: ");
  const cartAverage = await avgPrice(productId);
  const product = await getProdById(productId);
  const orderAverage = product ? product.price : 0;
  const profit = cartAverage - orderAverage;

  return `Profit: ${profit}`;
}

export async function fewestCommand() {
  const fewestProduct = await getFewestProd();

  if (fewestProduct) {
    const product = await getProdById(fewestProduct.productId);
    return `The product with the fewest quantity is ${product.name}.`;
  } else {
    return "The cart is empty.";
  }
}

export async function popularCommand() {
  const mostPopularProductId = await getMostPopularProd();

  if (mostPopularProductId) {
    const product = await getProdById(mostPopularProductId.productId);
    if (product) {
      return `The most popular product is ${product.name}.`;
    } else {
      return "The most popular product is not found.";
    }
  } else {
    return "The cart is empty.";
  }
}
