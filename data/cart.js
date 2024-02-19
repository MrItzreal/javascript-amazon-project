//export lets us use variables outside of their files.
export const cart = [];

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
}
