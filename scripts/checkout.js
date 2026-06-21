import { renderCheckoutPage } from "../scripts/checkout/orderSummary.js";
import { renderProductSummary } from "../scripts/checkout/paymentSummary.js";
import { loadProducs, loadProducsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";

//import "../../data/cart-oop.js";
//import "../../data/cart-oop-class.js";
//import "../data/car.js";
//import "../data/backend-practisse.js";

//async and await
/*
async function loadPage() {
  try {
    //throw "error1";
    await loadProducsFetch();

    await new Promise((resolve, reject) => {
      //throw "error2";
      loadCart(() => {
        //reject();
        resolve();
      });
    });
    await loadCartFetch();
  } catch (error) {
    console.log("Uexpected error,Please try again later");
  }

  renderCheckoutPage();
  renderProductSummary();
}

loadPage();
*/

//Excercise i
try {
  await loadProducsFetch();
  await loadCartFetch();
  await Promise.all([loadProducsFetch(), loadCartFetch()]).then(() => {
    renderCheckoutPage();
    renderProductSummary();
  });
} catch (error) {
  console.log("Uexpected error,Please try again later");
}

//Run Multiple Promise at a same time
// Promise.all([
//   loadProducsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then(() => {
//   renderCheckoutPage();
//   renderProductSummary();
// });

//Promise;
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
