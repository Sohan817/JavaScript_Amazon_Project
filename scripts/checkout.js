import { renderCheckoutPage } from "../scripts/checkout/orderSummary.js";
import { renderProductSummary } from "../scripts/checkout/paymentSummary.js";
import { loadProducs, loadProducsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//import "../../data/cart-oop.js";
//import "../../data/cart-oop-class.js";
//import "../data/car.js";
//import "../data/backend-practisse.js";

//Run Multiple Promise at a same time
Promise.all([
  loadProducsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderCheckoutPage();
  renderProductSummary();
});

//Promise
// new Promise((resolve) => {
//   loadProducs(() => {
//     resolve("Value1");
//   });
// }).then((Value) => {
//   console.log(Value);
//   renderCheckoutPage();
//   renderProductSummary();
// });

//Lared Promise for multiple callbacks
// new Promise((resolve) => {
//   loadProducs(() => {
//     resolve();
//   });
// })
//   .then(() => {
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderCheckoutPage();
//     renderProductSummary();
//   });

/*loadProducs(() => {
  renderCheckoutPage();
  renderProductSummary();
});
*/

//multiple callbacks
// loadProducs(() => {
//   loadCart(() => {
//     renderCheckoutPage();
//     renderProductSummary();
//   });
// });
