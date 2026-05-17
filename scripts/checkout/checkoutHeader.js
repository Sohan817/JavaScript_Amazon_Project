import { totalCartItem } from "../../data/cart.js";

//import "../../data/cart-oop.js";
import "../../data/cart-oop-class.js";

export function totalCartItemInCheckout() {
  const cartItemCount = document.querySelector(".js-cart-item-count");

  if (cartItemCount) {
    cartItemCount.innerHTML = `${totalCartItem()} Times`;
  }
}
