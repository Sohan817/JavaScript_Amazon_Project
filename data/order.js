import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { foratCurrency } from "../scripts/utils/money.js";
import { loadProducsFetch, getProduct } from "./products.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function saveOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

console.log(orders);

async function loadPage() {
  await loadProducsFetch();
  let orderHtml = "";
  orders.forEach((order) => {
    const orderTimeStrig = dayjs(order.orderTime).format("MMMM D,YYYY");
    orderHtml += `<div class="order-containers">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeStrig}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${foratCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
          ${productDetailHTL(order)}
          </div>
        </div>`;
  });

  function productDetailHTL(order) {
    let prodctListlHtml = "";
    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);
      const arrivingdON = dayjs(productDetails.estimatedDeliveryTime).format(
        "MMMM D",
      );
      prodctListlHtml += `<div class="product-image-container">
      <img src="${product.image}" />
    </div>

    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">Arriving on: ${arrivingdON}</div>
      <div class="product-quantity">Quantity: ${productDetails.quantity}</div>
      <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png" />
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>`;
    });
    return prodctListlHtml;
  }

  const orderDocument = document.querySelector(".js-order-grid");
  if (orderDocument) {
    orderDocument.innerHTML = orderHtml;
  }
}

loadPage();
