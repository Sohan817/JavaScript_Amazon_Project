import {
  cart,
  removeItemFromCart,
  totalCartItem,
  updateCheckOutPageQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { foratCurrency } from "./utils/money.js";
import { delivaryOptions } from "../data/delivaryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

let cartSummarHtml = "";

cart.forEach((cartItem) => {
  let productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const delivaryOptionId = cartItem.delivaryOptionsId;
  let delivaryOption;
  delivaryOptions.forEach((delivary) => {
    if (delivary.id === delivaryOptionId) {
      delivaryOption = delivary;
    }
  });
  const todaysDate = dayjs();
  const delivaryDate = todaysDate.add(delivaryOption.delivaryDays, "days");
  const dateString = delivaryDate.format("dddd, MMMM D");

  cartSummarHtml += `<div class="cart-item-container js-delete-container-${matchingProduct.id}">
                <div class="delivery-date">Delivery date: ${dateString} </div>

                <div class="cart-item-details-grid">
                <img
                    class="product-image"
                    src="${matchingProduct.image}"
                />

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">$${foratCurrency(matchingProduct.priceCents)}</div>
                    <div class="product-quantity">
                    <span> Quantity: <span class="quantity-label">${cartItem.Quantity}</span> </span>
                    <span class="update-quantity-link-${matchingProduct.id} link-primary js-update-from-checkout"
                    data-product-id = "${matchingProduct.id}">
                        Update
                    </span>
                    <input class ="input-item-quantity-${matchingProduct.id} input-item-quantity">
                    <span class="save-item-quantity-${matchingProduct.id} link-primary save-item-quantity">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-from-cart" 
                    data-product-id = "${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${delivaryOptionHTML(matchingProduct, cartItem)}
                </div>
                </div>
            </div>`;
});

function delivaryOptionHTML(matchingProduct, cartItem) {
  let delivaryHTML = "";
  delivaryOptions.forEach((delivaryOption) => {
    const todaysDate = dayjs();
    const delivaryDate = todaysDate.add(delivaryOption.delivaryDays, "days");
    const dateString = delivaryDate.format("dddd, MMMM D");
    const delivaryPrice =
      delivaryOption.delivaryPrice === 0
        ? "Free"
        : `$${foratCurrency(delivaryOption.delivaryPrice)}-`;
    const isChecked = delivaryOption.id === cartItem.delivaryOptionsId;
    delivaryHTML += `<div class="delivery-option">
    <input
    type="radio"
    ${isChecked ? "checked" : ""}
    class="delivery-option-input"
    name="delivery-option-${matchingProduct.id}"
    />
      <div>
      <div class="delivery-option-date">${dateString}</div>
      <div class="delivery-option-price">${delivaryPrice} Shipping</div>
  </div>
  </div>`;
  });
  return delivaryHTML;
}

document.querySelector(".js-order-summary").innerHTML = cartSummarHtml;
document.querySelector(".js-cart-item-count").innerHTML =
  `${totalCartItem()} Times`;

document.querySelectorAll(".js-delete-from-cart").forEach((deleteCartItem) => {
  deleteCartItem.addEventListener("click", () => {
    const cartProductId = deleteCartItem.dataset.productId;
    removeItemFromCart(cartProductId);
    const deleteItem = document.querySelector(
      `.js-delete-container-${cartProductId}`,
    );
    deleteItem.remove();
    location.reload();
  });
});

document
  .querySelectorAll(".js-update-from-checkout")
  .forEach((updateCartItem) => {
    updateCartItem.addEventListener("click", () => {
      const productId = updateCartItem.dataset.productId;
      updateCheckOutQuantity(productId);
      updateCheckoutIteamQuantity(productId);
    });
  });

//Change quantity update status
function updateCheckOutQuantity(productId) {
  document
    .querySelector(`.update-quantity-link-${productId}`)
    .classList.add("update-quantity-link-invisible");
  document
    .querySelector(`.input-item-quantity-${productId}`)
    .classList.add("input-item-quantity-visible");
  document
    .querySelector(`.save-item-quantity-${productId}`)
    .classList.add("save-item-quantity-visible");
}
function updateCheckOutQuantityReverse(productId) {
  document
    .querySelector(`.update-quantity-link-${productId}`)
    .classList.remove("update-quantity-link-invisible");
  document
    .querySelector(`.input-item-quantity-${productId}`)
    .classList.remove("input-item-quantity-visible");
  document
    .querySelector(`.save-item-quantity-${productId}`)
    .classList.remove("save-item-quantity-visible");
}

//Update checkoutItem Quantity
function updateCheckoutIteamQuantity(productId) {
  const saveQuantity = document.querySelectorAll(
    `.save-item-quantity-${productId}`,
  );
  saveQuantity.forEach((itemQuantity) => {
    itemQuantity.addEventListener("click", () => {
      let checkOutItemQuantity = Number(
        document.querySelector(`.input-item-quantity-${productId}`).value,
      );
      updateCheckOutPageQuantity(productId, checkOutItemQuantity);
      updateCheckOutQuantityReverse(productId);
      location.reload();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let checkOutItemQuantity = Number(
        document.querySelector(`.input-item-quantity-${productId}`).value,
      );
      updateCheckOutPageQuantity(productId, checkOutItemQuantity);
      updateCheckOutQuantityReverse(productId);
      location.reload();
    }
  });
}
