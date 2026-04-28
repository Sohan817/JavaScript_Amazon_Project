import { totalCartItem } from "../../data/cart.js";

export function totalCartItemInCheckout() {
  document.querySelector(".js-cart-item-count").innerHTML =
    `${totalCartItem()} Times`;
}
