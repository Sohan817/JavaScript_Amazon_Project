import { cart, addToCart, loadStorage } from "../../data/cart.js";

describe("Test Suit: addToCart", () => {
  it("Add new product to the cart:", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadStorage();
    expect(localStorage.getItem).toHaveBeenCalledWith("cart", "[]");
    // addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    // expect(cart.length).toEqual(1);
    // expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    //expect(cart[0].Quantity).toEqual(1);
  });

  it("Add existig product to the cart:", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          Quantity: 1,
          delivaryOptionsId: "1",
        },
      ]);
    });
    loadStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(2);
    expect(cart[1].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    //expect(cart[1].Quantity).toEqual(1);
  });
});
