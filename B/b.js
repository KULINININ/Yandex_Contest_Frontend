// Статус: полное решение

module.exports = function calculator() {
  return {
    value: 0,
    add: function (num) {
      this.value += num;
    },
    subtract: function (num) {
      this.value -= num;
    },
    multiply: function (num) {
      this.value *= num;
    },
    divide: function (num) {
      if (num === 0) {
        throw new Error("Cannot divide by zero.");
      }
      this.value /= num;
    },
    getValue: function () {
      return this.value;
    },

    magic: function (fn) {
      const func = (num) => {
        try {
          fn.bind(this)(num);
        } catch {}
        return func;
      };

      return func;
    },
  };
};

const calc = module.exports(); // Начинаем с 0

calc.add(10); // Добавляем 10
calc.multiply(2); // Умножаем на 2
calc.subtract(5); // Вычитаем 5
calc.divide(3); // Делим на 3

calc.getValue(); // Текущий результат: 5

calc.magic(calc.add)(2)(3)(4); // Добавляем к результату 2, потом 3, потом 4

console.log(calc.getValue()); // Вывод финального результата: 14
