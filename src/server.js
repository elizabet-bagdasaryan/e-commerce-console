import readline from "readline-sync";

let products = [];
let cart = [];

function findProductIndex(productId) {
  return products.findIndex((product) => product.id === productId);
}

function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

function getCartProductById(productId) {
  return cart.find((item) => item.productId === productId);
}

function calculateAveragePrice(productId) {
  const cartProduct = getCartProductById(productId);
  if (!cartProduct) return 0;

  const totalPrice = cartProduct.quantity * cartProduct.price;
  const totalQuantity = cartProduct.quantity;
  return totalPrice / totalQuantity;
}

function saveProduct() {
  const name = readline.question("Enter the product name: ");
  const price = parseFloat(readline.question("Enter the product price: "));
  const id = readline.question("Enter the product ID: ");

  const existingProductIndex = findProductIndex(id);

  if (existingProductIndex !== -1) {
    // Update existing product
    products[existingProductIndex].name = name;
    products[existingProductIndex].price = price;
  } else {
    // Create a new product
    products.push({ name, price, id });
  }

  console.log("Product saved successfully!\n");
}

function addToCart(productId, quantity, price) {
  const existingCartItem = getCartProductById(productId);

  if (existingCartItem) {
    // Update existing cart item
    existingCartItem.quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({ productId, quantity, price });
  }

  console.log("Product added to the cart!\n");
}

function purchaseProduct() {
  const quantity = parseInt(readline.question("Enter the quantity: "));
  const price = parseFloat(readline.question("Enter the price: "));
  const productId = readline.question("Enter the product ID: ");

  addToCart(productId, quantity, price);
}

function placeOrder() {
  const quantity = parseInt(readline.question("Enter the quantity: "));
  const productId = readline.question("Enter the product ID: ");

  const cartProduct = getCartProductById(productId);

  if (!cartProduct || cartProduct.quantity < quantity) {
    console.log("Insufficient quantity in the cart.");
    return;
  }

  cartProduct.quantity -= quantity;
  console.log("Order placed successfully!\n");
}

function getProductQuantity(productId) {
  const cartProduct = getCartProductById(productId);
  return cartProduct ? cartProduct.quantity : 0;
}

function getProfit(productId) {
  const cartAverage = calculateAveragePrice(productId);
  const product = getProductById(productId);
  const orderAverage = product ? product.price : 0;

  return cartAverage - orderAverage;
}

function getFewestProduct() {
  if (cart.length === 0) {
    console.log("The cart is empty.");
    return;
  }

  let fewestProduct = cart[0];
  for (const item of cart) {
    if (item.quantity < fewestProduct.quantity) {
      fewestProduct = item;
    }
  }

  const product = getProductById(fewestProduct.productId);
  console.log(`The product with the fewest quantity is ${product.name}.`);
}

function getMostPopularProduct() {
  if (cart.length === 0) {
    console.log("The cart is empty.");
    return;
  }

  const productIdToFrequencyMap = {};

  for (const item of cart) {
    if (productIdToFrequencyMap[item.productId]) {
      productIdToFrequencyMap[item.productId]++;
    } else {
      productIdToFrequencyMap[item.productId] = 1;
    }
  }

  let mostPopularProductId = Object.keys(productIdToFrequencyMap).reduce(
    (a, b) => (productIdToFrequencyMap[a] > productIdToFrequencyMap[b] ? a : b)
  );

  const mostPopularProduct = getProductById(mostPopularProductId);
  console.log(`The most popular product is ${mostPopularProduct.name}.`);
}

// The main application loop
function main() {
  while (true) {
    console.log("Available commands:");
    console.log("1. npm run product:save");
    console.log("2. npm run product:purchase");
    console.log("3. npm run product:order");
    console.log("4. npm run product:get-quantity");
    console.log("5. npm run product:average-price");
    console.log("6. npm run product:profit");
    console.log("7. npm run product:fewest");
    console.log("8. npm run product:popular");
    console.log("9. Exit\n");

    const command = parseInt(readline.question("Enter the command number: "));

    switch (command) {
      case 1:
        saveProduct();
        break;
      case 2:
        purchaseProduct();
        break;
      case 3:
        placeOrder();
        break;
      case 4:
        const productId1 = readline.question("Enter the product ID: ");
        console.log(`Quantity: ${getProductQuantity(productId1)}\n`);
        break;
      case 5:
        const productId2 = readline.question("Enter the product ID: ");
        console.log(`Average price: ${calculateAveragePrice(productId2)}\n`);
        break;
      case 6:
        const productId3 = readline.question("Enter the product ID: ");
        console.log(`Profit: ${getProfit(productId3)}\n`);
        break;
      case 7:
        getFewestProduct();
        break;
      case 8:
        getMostPopularProduct();
        break;
      case 9:
        console.log("Exiting the application.");
        return;
      default:
        console.log("Invalid command. Please try again.\n");
    }
  }
}

main();
