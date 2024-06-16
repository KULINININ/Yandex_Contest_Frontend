// Статус: полное решение

/**
 * @param {string} number
 * @returns {string}
 */
function restoreTheBankNumber(str) {
  const regex = /^(?!.*(00|22))[012]{3,7}(?:-[012]{3,7})*$/;

  const set = ["0", "1", "2", "-"];

  function check(s) {
    if (!regex.test(s)) {
      return false;
    }

    if (
      /^(?!0)(?:(?!00).)*$/.test(s) &&
      s.split("-").reduce((acc, item) => {
        if (item === "1") {
          acc += 1;
        }
        return acc;
      }, 0) <= 1 &&
      s
        .split("-")
        .slice(1)
        .every((item) => item.length > 4)
    ) {
      return true;
    }

    if (
      s.split("-").some((item) => item.length === 5 || item.length === 7) &&
      s.split("-").some((item) => Number(item) < 20000) &&
      s.split("-").length >= 2 &&
      s.split("-")[1].length === 6
    ) {
      return true;
    }
  }

  for (let i = 0; i < 4; i++) {
    const result = str.replace(".", set[i]);
    if (check(result)) {
      return result;
    }
  }
}

// module.exports = restoreTheBankNumber;

// const restoreTheBankNumber = require("solution.js");

console.log(restoreTheBankNumber("111111-011111-2.02102")); // '111111-011111-2102102'

restoreTheBankNumber("111111.011111-2102102"); // '111111-011111-2102102'

restoreTheBankNumber("111111-.11111-2102102"); // '111111-011111-2102102'
