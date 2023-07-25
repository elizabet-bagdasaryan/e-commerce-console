# E-commerce product console application

This is a console application built with Node.js and MongoDB that allows you to manage products, perform purchases, place orders, and get various statistics about the products in the cart and the orders placed.

## Installation

1. Clone the repository from GitHub.
2. Navigate to the project directory in the terminal.
3. Install the required dependencies using npm:
   npm install
5. Make sure you have MongoDB installed and running on your system.

## Commands

Before running any command, make sure you are in the project directory in the terminal.

### 1. Save or Update Product

npm run product:save

This command allows you to create a new product or update the name and price of an existing product. It will prompt you to enter the following information for the product:

- `name`: The name of the product.
- `price`: The price of the product.
- `id`: The unique identifier of the product.

### 2. Purchase Product

npm run product:purchase

This command lets you store a specific number of a product with a certain price in the cart. You need to provide the following details:

- `quantity`: The quantity of the product to purchase.
- `price`: The price of the product at which it is being purchased.
- `productId`: The unique identifier of the product.

### 3. Place Order

npm run product:order


With this command, you can place an order for a specific product and the desired quantity from the cart. Provide the following information:

- `quantity`: The quantity of the product to order.
- `productId`: The unique identifier of the product.

### 4. Get Product Quantity in Cart

npm run product:get-quantity


This command allows you to check how much of a specific product is currently in the cart. You need to provide:

- `productId`: The unique identifier of the product.

### 5. Calculate Average Price in Cart

npm run product:average-price


This command returns the average price of all the items in the cart for a specific product. You need to provide:

- `productId`: The unique identifier of the product.

### 6. Calculate Profit

npm run product:profit


This command calculates the difference between the average price of items in the cart for a specific product and the average price of the orders that have already been placed. Provide:

- `productId`: The unique identifier of the product.

### 7. Find Product with Smallest Quantity

npm run product:fewest

This command returns the product that currently has the smallest quantity in the cart.

### 8. Find Most Popular Product

npm run product:popular


This command returns the name of the product that is most frequently ordered.

## Database

The application uses MongoDB as its database to store product information, cart items, and orders.

Please make sure to have MongoDB running locally or provide the appropriate connection string in the application's configuration file.

## Note

The application assumes that each product has a unique identifier (productId) and that the price of a product remains constant once it is saved.


## Contributions

Contributions to the E-commerce console app are welcome! If you have any suggestions, bug reports, or feature requests, please feel free to open an issue or submit a pull request. Make sure to follow the existing coding style and guidelines.

## Contact

If you have any questions or need further assistance, please contact [elizabet.bagdasaryan1@gmail.com]






