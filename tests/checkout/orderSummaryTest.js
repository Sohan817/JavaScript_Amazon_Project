import { renderCheckoutPage } from "../../scripts/checkout/orderSummary.js";
import { loadStorage, cart } from "../../data/cart.js";

describe("Test suit for: renderCheckoutPage()", () => {
  // beforeEach(() => {
  //   spyOn(localStorage, "setItem");
  //   document.querySelector(".js-test-container").innerHTML = `
  //   <div class="js-order-summary"></div>
  //   <div class="js-payment-summary"></div>
  //   `;
  //   const productId1 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
  //   const productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";
  //   spyOn(localStorage, "getItem").and.callFake(() => {
  //     return JSON.stringify([
  //       {
  //         productId: productId1,
  //         Quantity: 1,
  //         delivaryOptionsId: "1",
  //       },
  //       {
  //         productId: productId2,
  //         Quantity: 1,
  //         delivaryOptionsId: "1",
  //       },
  //     ]);
  //   });
  //   loadStorage();
  //   renderCheckoutPage();
  // });
  it("Display the cart:", () => {
    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-order-summary"></div>
    `;
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          Quantity: 1,
          delivaryOptionsId: "1",
        },
      ]);
    });
    loadStorage();
    renderCheckoutPage();
    expect(document.querySelectorAll(".cart-item-container").length).toEqual(1);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText,
    ).toContain("Quantity: 1");
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("Remove a product", () => {
    spyOn(localStorage, "setItem");
    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    `;
    const productId1 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
    const productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          Quantity: 1,
          delivaryOptionsId: "1",
        },
        {
          productId: productId2,
          Quantity: 1,
          delivaryOptionsId: "1",
        },
      ]);
    });

    loadStorage();
    renderCheckoutPage();

    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll(".cart-item-container").length).toEqual(1);
    expect(
      document.querySelector(`.js-delete-container-${productId1}`),
    ).toEqual(null);

    expect(
      document.querySelectorAll(`.js-delete-container-${productId2}`),
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    document.querySelector(".js-test-container").innerHTML = "";
  });
});
