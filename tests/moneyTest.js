import { formatCurrency } from "../scripts/utils/money.js";

//These are TEST CASES. They test if our code is working.
//2 types of Test Cases:
//1- Basic test case: tests if code works or not.
//2- Edge test case: tests with values meant to be tricky.

//Test Suite: group of related tests.
console.log("test suite: formatCurrency");
//Example of Basic test case.
console.log("converts cents into dollars");

if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

//Examples of Edge test cases.
console.log("works with 0");

if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up to nearest cent");

if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}
