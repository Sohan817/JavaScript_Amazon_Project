import { totalCartItem } from "../../data/cart.js";

export function totalCartItemInCheckout() {
  const cartItemCount = document.querySelector(".js-cart-item-count");

  if (cartItemCount) {
    cartItemCount.innerHTML = `${totalCartItem()} Times`;
  }
}
