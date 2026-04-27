import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { foratCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/delivaryOptions.js";

export function renderProductSummary() {
  let productPriceCents = 0;
  let deliveryCost = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.delivaryOptionsId);
    productPriceCents += product.priceCents * cartItem.Quantity;
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
        <div class="payment-summary-money">$${foratCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${foratCurrency(deliveryCost)}</div>
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
        <div class="payment-summary-money">$${foratCurrency(OrderTotal)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
