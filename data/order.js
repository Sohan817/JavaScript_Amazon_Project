export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function saveOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
