export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    Quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    Quantity: 3,
  },
];

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  let Quantity = Number(
    document.querySelector(`.js-product-quantity-${productId}`).value,
  );
  cart.push({
    // productId: productId,
    // quantity: Quantity,
    productId,
    Quantity,
  });
}
