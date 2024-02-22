import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

hello();

//Dayjs external library.
//Method .add() takes 2 parameters:
//1-number of time you want to add such as: 1,7,15 etc.
//2-length of time you want such as: days.
//Something to note is that not all external libraries have esm versions,
//so you may still need to use script tags in order to use them.
const today = dayjs();
const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM, D"));

//Accumulator pattern.
let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  //Delivery options: FREE, $4.99 or $9.99 shipping.
  //dayjs was also used to get correct dates for options.
  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM, D");

  cartSummaryHTML += ` 
  <div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
<div class="delivery-date">Delivery date: ${dateString}</div>

<div class="cart-item-details-grid">
  <img
    class="product-image"
    src="${matchingProduct.image}"
  />

  <div class="cart-item-details">
    <div class="product-name">
    ${matchingProduct.name}
    </div>
    <div class="product-price">
    $${formatCurrency(matchingProduct.priceCents)}
    </div>
    <div class="product-quantity">
      <span> Quantity: <span class="quantity-label">
      ${cartItem.quantity}</span> </span>
      <span class="update-quantity-link link-primary">
        Update
      </span>
      <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
        matchingProduct.id
      }">
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    ${deliveryOptionsHTML(matchingProduct, cartItem)}
  </div>
</div>
</div>
`;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM, D");

    //Ternary Operator but it can be done as a IF statement as well.
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

    //variable for check boxes on delivery options.
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
<div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
  <input type="radio"
  ${isChecked ? "checked" : ""}
  class="delivery-option-input"
  name="delivery-option-${matchingProduct.id}"
  />
  <div>
    <div class="delivery-option-date">${dateString}</div>
    <div class="delivery-option-price">${priceString} Shipping</div>
  </div>
</div>
`;
  });

  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

//Deletes items from our cart thanks to:
//DOM manipulation and its method: .remove().
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      //we used template string to insert productId into the string.
      `.js-cart-item-container-${productId}`
    );
    container.remove();
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    // const productId = element.dataset.productId;
    // const deliveryOptionId = element.dataset.deliveryOptionId;
    //shorthand for code above.
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});

// NOTES:
//Data Attribute: is an HTML attribute that allows us to attach information to elements,
//it has to start w/ "data-" and then you can name it whatever you want.
//.dataset helps us get the data from properties,
//but we use camelCase to access the data instead of kebab-case.
//IMPORTANT: when using data attribute make sure to write the ${} without space ex:,
//="${}}" if you accidentally space code will not work.
