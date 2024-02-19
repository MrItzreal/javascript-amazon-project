import { cart } from "../data/cart.js";

//Accumulator pattern.
let productsHTML = "";

products.forEach((product) => {
  //since JS does not do well with decimals we divide the,
  //whole price by 100 so we can get the exact merch price.
  //.toFixed():it helps to show a number with two decimal places,
  //.toFixed():forces the equation to show two decimals even if divided by 100.
  //Data Attribute: is an HTML attribute that allows us to attach information to elements,
  //it has to start w/ "data-" and then you can name it whatever you want.

  productsHTML += `
  <div class="product-container">
  <div class="product-image-container">
    <img
      class="product-image"
      src="${product.image}"
    />
  </div>

  <div class="product-name limit-text-to-2-lines">
    ${product.name}
  </div>

  <div class="product-rating-container">
    <img
      class="product-rating-stars"
      src="images/ratings/rating-${product.rating.stars * 10}.png"
    />
    <div class="product-rating-count link-primary">${product.rating.count}</div>
  </div>

  <div class="product-price">
  $${(product.priceCents / 100).toFixed(2)}
  </div>

  <div class="product-quantity-container">
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart">
    <img src="images/icons/checkmark.png" />
    Added
  </div>

  <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="
  ${product.id}">
  Add to Cart
  </button>
</div>
`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    //.dataset helps us get the data from properties,
    //but we use camelCase to access the data instead of kebab-case.
    const productId = button.dataset.productId;

    //checks if product is already in cart.
    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
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

    //cartQuantity increases the number of items,
    //every time we add an item to the cart by using DOM.
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  });
});
