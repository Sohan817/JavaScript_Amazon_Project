export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [];
}

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
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
    delivaryOptionsId: "1",
  });
  saveToLocalStorage();
}

export function removeItemFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToLocalStorage();
}

export function totalCartItem() {
  let totalCartQuantity = 0;
  cart.forEach((quantity) => {
    totalCartQuantity = totalCartQuantity + quantity.Quantity;
  });
  return totalCartQuantity;
}

export function updateCheckOutPageQuantity(productId, newQuantity) {
  cart.forEach((quantity) => {
    if (quantity.productId === productId) {
      if (newQuantity > 0 && newQuantity <= 1000) {
        quantity.Quantity = newQuantity;
      } else {
        quantity.Quantity = quantity.Quantity;
      }
    }
  });
  saveToLocalStorage();
}
