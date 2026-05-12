import {
  cart,
  addToCart,
  loadStorage,
  removeItemFromCart,
} from "../../data/cart.js";

describe("Test Suit: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("Add new product to the cart:", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","Quantity":null,"delivaryOptionsId":"1"}]',
    );
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
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
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","Quantity":1,"delivaryOptionsId":"1"},{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","Quantity":null,"delivaryOptionsId":"1"}]',
    );
    expect(cart[1].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    //expect(cart[1].Quantity).toEqual(1);
  });
});

describe("Test suit:removeItemFromCart():", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  const productId1 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
  const productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";
  it("Remove a productId that is in the cart:", () => {
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
    expect(removeItemFromCart(productId1)).toEqual(undefined);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it("Remove a productId that is not in the cart:", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId2,
          Quantity: 1,
          delivaryOptionsId: "1",
        },
      ]);
    });
    loadStorage();
    expect(removeItemFromCart(productId1)).toEqual(undefined);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
