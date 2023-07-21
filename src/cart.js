let cart = [];

function getCartProdById(productId) {
  return cart.find((item) => item.productId === productId);
}

export function addToCart(productId, quantity, price) {
  const existCartItem = getCartProdById(productId);

  if (existCartItem) {
    existCartItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, price });
  }
}

export function order(productId, quantity) {
  const cartProduct = getCartProdById(productId);
  if (!cartProduct || cartProduct.quantity < quantity) {
    console.log("Not enough quantity in the cart");
    return;
  }
  cartProduct.quantity -= quantity;
}

export function getCartQuantity(productId) {
  const cartProduct = getCartProdById(productId);
  return cartProduct ? cartProduct.quantity : 0;
}
export function avgPrice(productId) {
  const cartProduct = getCartProdById(productId);
  if (!cartProduct) return 0;

  const totalPrice = cartProduct.quantity * cartProduct.price;
  const totalQuant = cartProduct.quantity;
  return totalPrice / totalQuant;
}

export function getFewestProd() {
  if (cart.lenth === 0) {
    console.log("The cart is empty");
    return;
  }
  let fewestProduct = cart[0];

  for (const item of cart) {
    if (item.quantity < fewestProduct.quantity) {
      fewestProduct = item;
    }
  }
  return fewestProduct;
}

export function getMostPopularProd() {
  if (cart.lenth === 0) {
    console.log("The cart is empty.");
    return;
  }
  const productIdFreq = {};

  for (const item of cart) {
    if (productIdFreq[item.productId]) {
      productIdFreq[item.productId]++;
    } else {
      productIdFreq[item.productId] = 1;
    }
  }
  let mostPopularProductId = Object.keys(productIdFreq).reduce((a, b) =>
    productIdFreq[a] > productIdFreq[b] ? a : b
  );

  return mostPopularProductId;
}
