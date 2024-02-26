import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

//Testing only a portion of your code is called: "Uni Tests".
//Testing many units/pieces of code is called "Integration Tests".
//A shortcut in jasmine is 'hooks' which lets us run code for each test.

describe("test suite: renderOrderSummary", () => {
  //to avoid repeating the ID number we created a var instead to make it easier.
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  //beforeEach hook.
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
  <div class="js-order-summary"></div>
  <div class="js-payment-summary"></div>
  `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        //Data deduplication or normalizing data is a technique for eliminating redundant,
        //copies of data essentially minimizing storage space and bandwidth usage.
        //using the product ID we get the other values without having to retype them.
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("removes a product", () => {
    //we use template string to insert into strings.
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector(".js-test-container").innerHTML = "";
  });
});
