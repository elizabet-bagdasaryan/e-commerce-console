import readline from "readline-sync";
import {
  saveProductCommand,
  purchaseProductCommand,
  orderProductCommand,
  getQuantityCommand,
  averagePriceCommand,
  profitCommand,
  fewestCommand,
  popularCommand,
} from "./commands.js";
import { connection } from "./mongo.js";
import dotenv from "dotenv";
dotenv.config();
connection();

async function main() {
  try {
    await connection();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }

  console.log("Available commands:");
  console.log("1. npm run product:save");
  console.log("2. npm run product:purchase");
  console.log("3. npm run product:order");
  console.log("4. npm run product:get-quantity");
  console.log("5. npm run product:average-price");
  console.log("6. npm run product:profit");
  console.log("7. npm run product:fewest");
  console.log("8. npm run product:popular");

  while (true) {
    const input = readline.question("Enter the command: \n");

    switch (input) {
      case "npm run product:save":
        const saveResult = await saveProductCommand();
        console.log(saveResult);
        break;
      case "npm run product:purchase":
        console.log(await purchaseProductCommand());
        break;
      case "npm run product:order":
        console.log(await orderProductCommand());
        break;
      case "npm run product:get-quantity":
        console.log(await getQuantityCommand());
        break;
      case "npm run product:average-price":
        console.log(await averagePriceCommand());
        break;
      case "npm run product:profit":
        console.log(await profitCommand());
        break;
      case "npm run product:fewest":
        console.log(await fewestCommand());
        break;
      case "npm run product:popular":
        console.log(await popularCommand());
        break;
      default:
        console.log("Invalid command. Please try again.\n");
    }
  }
}

main();
