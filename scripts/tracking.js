import { orders } from "../data/order.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct, loadProducsFetch } from "../data/products.js";
const url = new URL(window.location.href);
const trackingUrlProductId = url.searchParams.get("productId");
const trackingUrlOrderId = url.searchParams.get("orderId");

console.log(trackingUrlProductId);
console.log(trackingUrlOrderId);
console.log(orders);

async function loadTrackingPage() {
  await loadProducsFetch();

  let trackingHtml = "";

  orders.forEach((order) => {
    const product = getProduct(trackingUrlProductId);
    let arrivingdON;
    let quantity;
    let deliveryTime;
    let margin;

    order.products.forEach((productDetails) => {
      if (productDetails.productId === trackingUrlProductId) {
        arrivingdON = dayjs(productDetails.estimatedDeliveryTime).format(
          "dddd,MMMM D",
        );
        quantity = productDetails.quantity;
        deliveryTime = dayjs(productDetails.estimatedDeliveryTime).format(
          "YYYY-MM-DD",
        );
      }
    });

    const date = dayjs();
    const currentDay = date.diff(date.startOf("year"), "day") + 1;
    const ordeTime = dayjs(order.orderTime).format("YYYY-MM-DD");
    const ordeTimeDate = dayjs(ordeTime);
    const ordeTimeDay =
      ordeTimeDate.diff(ordeTimeDate.startOf("year"), "day") + 1;
    const deliveryDate = dayjs(deliveryTime);
    const deliveryDay =
      deliveryDate.diff(deliveryDate.startOf("year"), "day") + 1;
    console.log(ordeTimeDay);
    console.log(currentDay);
    console.log(deliveryDay);

    margin = (currentDay - ordeTimeDay) / (deliveryTime - ordeTimeDay);
    console.log(margin);

    trackingHtml = `<a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
    </a>

    <div class="delivery-date">Arriving on ${arrivingdON}</div>

    <div class="product-info">
        ${product.name}
    </div>

    <div class="product-info">Quantity: ${quantity}</div>

    <img
        class="product-image"
        src="${product.image}"
    />

    <div class="progress-labels-container">
        <div class="progress-label">Preparing</div>
        <div class="progress-label current-status">Shipped</div>
        <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
    <div class="progress-bar"></div>
</div>`;
  });

  document.querySelector(".js-order-tracking").innerHTML = trackingHtml;
}

loadTrackingPage();
