import { renderCheckoutPage } from "../../scripts/checkout/orderSummary.js";
import { loadStorage, cart } from "../../data/cart.js";
import { renderProductSummary } from "../../scripts/checkout/paymentSummary.js";
import { loadProducs, loadProducsFetch } from "../../data/products.js";

describe("Test suit for: renderCheckoutPage()", () => {
  const productId1 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
  const productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";

  beforeAll((done) => {
    loadProducsFetch().then(() => {
      done();
    });
  });
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    `;
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
    renderProductSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("Display the cart:", () => {
    expect(document.querySelectorAll(".cart-item-container").length).toEqual(2);
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText,
    ).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText,
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-price-summary-${productId2}`).innerText,
    ).toContain("$");
  });

  it("Remove a product", () => {
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
  });

  //Test for delivery option

  it("Update delivery option", () => {
    document
      .querySelector(
        `.js-delivery-option-productId-${productId1}-deliveryOptionId-${3}`,
      )
      .click();
    expect(
      document.querySelector(
        `.js-delivery-option-productId-${productId1}-deliveryOptionId-${3}`,
      ).checked,
    ).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].delivaryOptionsId).toEqual("3");
    expect(
      document.querySelector(".js-payment-summary-shipping").innerText,
    ).toEqual("$9.99");
    expect(
      document.querySelector(".js-payment-summary-orderTotal").innerText,
    ).toEqual("$40.67");
  });
});
