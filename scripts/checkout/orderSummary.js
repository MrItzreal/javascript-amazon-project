import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

//Function renderOrderSummary runs the entire code so we can refresh,
//the delivery options without us having to click refresh.
export function renderOrderSummary() {
  //Accumulator pattern.
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    //takes product ID and finds the matching product.
    //getProduct is the function in the products.js file.
    const matchingProduct = getProduct(productId);

    //Delivery options: FREE, $4.99 or $9.99 shipping.
    //dayjs was also used to get correct dates for options.
    const deliveryOptionId = cartItem.deliveryOptionId;

    //This is for when we select a different shipping order the,
    //shipping & handling in the order summary will change.
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    //dayjs external library for dates.
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM, D");

    cartSummaryHTML += ` 
  <div class="cart-item-container 
  js-cart-item-container
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
    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
      <span> Quantity: <span class="quantity-label">
      ${cartItem.quantity}</span> </span>
      <span class="update-quantity-link link-primary">
        Update
      </span>
      <span class="delete-quantity-link link-primary js-delete-link 
      js-delete-link-${matchingProduct.id}" 
      data-product-id="${matchingProduct.id}">
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
      //After clicking delete, it updates the data and regenerates the HTML.
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      // const productId = element.dataset.productId;
      // const deliveryOptionId = element.dataset.deliveryOptionId;
      //shorthand for code above.
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      //renderOrderSummary(): helps up re-run all the code in this function,
      //which re-renders our page so when we choose a delivery option it,
      //will refresh automatically the changes in the dates.
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

// NOTES:
//Data Attribute: is an HTML attribute that allows us to attach information to elements,
//it has to start w/ "data-" and then you can name it whatever you want.
//.dataset helps us get the data from properties,
//but we use camelCase to access the data instead of kebab-case.
//IMPORTANT: when using data attribute make sure to write the ${} without space ex:,
//="${}}" if you accidentally space code will not work.
// MVC splits our code in 3 parts:
// -Model: saves and manages the data.
// -View: takes the data and displays it on the page.
// -Controller: runs code when users interact with the page.
