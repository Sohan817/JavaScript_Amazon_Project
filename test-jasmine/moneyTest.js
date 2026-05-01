import { foratCurrency } from "../scripts/utils/money.js";

describe("Test Suit: foratCurrency", () => {
  it("Convert Cents into doller", () => {
    expect(foratCurrency(2095)).toEqual("20.95");
  });
  it("Work with 0", () => {
    expect(foratCurrency(0)).toEqual("0.00");
  });
  it("Round to the closest cents", () => {
    expect(foratCurrency(2095.5)).toEqual("20.96");
  });
});
