import { foratCurrency } from "../scripts/utils/money.js";

console.log("Test Suit: foratCurrency");

if (foratCurrency(2095) === "20.95") {
  console.log("1st Test Passed");
} else {
  console.log("1st Test Failed");
}

if (foratCurrency(0) === "0.00") {
  console.log("2nd Test Passed");
} else {
  console.log("2nd Test Failed");
}
if (foratCurrency(2000.5) === "20.01") {
  console.log("3rd Test Passed");
} else {
  console.log("3rd Test Failed");
}
