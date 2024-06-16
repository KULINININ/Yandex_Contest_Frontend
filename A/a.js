// Статус: полное решение

const input = {
  vars: [
    {
      id: "a",
      formula: "calcA",
    },
    {
      id: "b",
      formula: "calcB",
    },
    {
      id: "c",
      formula: "calcC",
    },
    {
      id: "d",
      value: 5,
    },
    {
      id: "f",
      value: 5,
    },
  ],
  calculations: [
    {
      id: "calcA",
      formula: "$b + $c",
    },
    {
      id: "calcB",
      formula: "$d * ( $f + 5 )",
    },
    {
      id: "calcC",
      formula: "$f + $b",
    },
  ],
};

module.exports = function solution(input) {
  const vars = input["vars"].reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const calculations = input["calculations"].reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const output = {};

  const validSymbols = ["+", "-", "*", "/", "(", ")"];

  let counter = 0;

  function calc(formulaName) {
    counter++;
    if (counter > 50) {
      throw "impossible";
    }
    const letters = formulaName.match(/[a-zA-Z]/g);

    if (letters === null) {
      return eval(formulaName);
    }

    let newStr = formulaName;

    formulaName.split(" ").forEach((elem) => {
      if (calculations[elem] !== undefined) {
        newStr = newStr.replace(elem, calculations[elem].formula);
      } else if (vars[elem.slice(1)] !== undefined) {
        if (vars[elem.slice(1)].value === undefined) {
          newStr = newStr.replace(elem, vars[elem.slice(1)].formula);
        } else {
          newStr = newStr.replace(elem, vars[elem.slice(1)].value);
        }
      } else if (!validSymbols.includes(elem) && !/^\d+$/.test(elem)) {
        throw "Undefined formula";
      }
    });

    return calc(newStr);
  }

  try {
    for (let elem of Object.values(vars)) {
      if (elem.value === undefined) {
        output[elem.id] = calc(elem.formula);
      } else {
        output[elem.id] = elem.value;
      }
    }

    return output;
  } catch (error) {
    return "impossible";
  }
};

console.log(module.exports(input));
