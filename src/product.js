let products = [];

function findProdIndex(productId) {
  return products.findIndex((product) => product.id === productId);
}

export function getProdById(productId) {
  return products.find((product) => product.id === productId);
}

export function saveProduct(name, price, id) {
  const existProdIndex = findProdIndex(id);

  if (existProdIndex !== -1) {
    products[existProdIndex].name = name;
    products[existProdIndex].price = price;
  }
  //tu arsebobs vaaupdatebt
  else {
    products.push({ name, price, id });
  }
}
