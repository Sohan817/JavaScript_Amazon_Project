export const cart = [];

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
