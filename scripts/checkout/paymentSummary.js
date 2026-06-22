import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { foratCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/delivaryOptions.js";
import { saveOrder } from "../../data/order.js";

export function renderProductSummary() {
  let productPriceCents = 0;
  let deliveryCost = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.delivaryOptionsId);
    productPriceCents += product.priceCents * cartItem.quantity;
    deliveryCost += deliveryOption.delivaryPrice;
  });
  const totalBeforeTax = productPriceCents + deliveryCost;
  const estiatedTax = totalBeforeTax * (10 / 100);
  const OrderTotal = totalBeforeTax + estiatedTax;
  let cartItemCount = cart.length;

  const paymentSummaryHTML = `
        <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
        <div>Items (${cartItemCount}):</div>
        <div class="payment-summary-money js-s">$${foratCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-payment-summary-shipping">$${foratCurrency(deliveryCost)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${foratCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${foratCurrency(estiatedTax)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-payment-summary-orderTotal">$${foratCurrency(OrderTotal)}</div>
        </div>

        <button class="place-order-button button-primary 
        js-place-order">
        Place your order
        </button>
  `;
  const paymentSum = document.querySelector(".js-payment-summary");
  if (paymentSum) {
    paymentSum.innerHTML = paymentSummaryHTML;
  }

  //Place order
  document
    .querySelector(".js-payment-summary")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        const order = await response.json();
        saveOrder(order);
      } catch (error) {
        console.log(error);
      }
      window.location.href = "orders.html";
    });
}
