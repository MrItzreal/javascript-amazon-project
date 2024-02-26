import { formatCurrency } from "../../scripts/utils/money.js";

//In jasmine to create a test suite,
//we use the "describe" function.
//to give a name we use the "it" function.
//instead of using IF statements in jasmine we use "expect".
//Testing only a portion of your code is called: "Uni Tests".
//Testing many units/pieces of code is called "Integration Tests".

describe("test suite: formatCurrency", () => {
  it("converts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
