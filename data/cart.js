export let cart = JSON.parse(localStorage.getItem("cart"));
//.getItem() takes only one string.
//JSON.parse() converts strings into objects or values.

if (!cart) {
  cart = [
    //Data deduplication or normalizing data is a technique for eliminating redundant,
    //copies of data essentially minimizing storage space and bandwidth usage.
    //using the product ID we get the other values without having to retype them.
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

function saveToStorage() {
  //.setItem() takes two strings:
  //1:Name of what you want to save.
  //2:Data you want to save.
  //LocalStorage only saves strings so we use JSON.stringify to convert to strings.
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  //checks if product is already in cart.
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  }); //if product already in cart it increases the quantity.

  if (matchingItem) {
    matchingItem.quantity += 1;
  } //if not in cart, then it adds to cart.
  else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}
