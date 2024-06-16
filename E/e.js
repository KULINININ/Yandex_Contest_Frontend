// Статус: неверное решение
// Пройдено тестов: 24/36

/**
 * @typedef {Object} SchemaEntry
 * @property {string} name
 * @property {string} type
 * @property {Object[]} [parameters]
 * @property {string} parameters.documentation
 * @property {string} parameters.name
 * @property {string} parameters.type
 * @property {string} [documentation]
 * @property {string} [returnType]
 */

/**
 * Compares two schema entries and returns the difference.
 * @param {SchemaEntry[]} oldSchema - An array of old schema entries.
 * @param {SchemaEntry[]} newSchema - An array of new schema entries.
 * @return {"major" | "minor" | "patch"} - The result of comparing oldSchema and newSchema.
 */

function solution(oldSchema, newSchema) {
  function checkNewFunction() {
    if (oldSchema.length < newSchema.length) {
      return "minor";
    }
  }

  function checkRemovedFunction() {
    if (oldSchema.length > newSchema.length) {
      return "major";
    }
  }

  function checkDoc() {
    const oldDoc = oldSchema.reduce((acc, item) => {
      acc[item.name] = item.documentation ?? "";
      return acc;
    }, {});

    const newDoc = newSchema.reduce((acc, item) => {
      acc[item.name] = item.documentation ?? "";
      return acc;
    }, {});

    for (let key in oldDoc) {
      if (oldDoc[key] !== newDoc[key]) {
        return "patch";
      }
    }
  }

  function checkNewType() {
    const oldTypes = oldSchema.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    const newTypes = newSchema.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    for (let key in oldTypes) {
      if (
        oldTypes[key].type.length < newTypes[key].type.length &&
        oldTypes[key].parameters === undefined &&
        newTypes[key].parameters === undefined
      ) {
        return "minor";
      }
    }
  }

  function checkRemovedType() {
    const oldTypes = oldSchema.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    const newTypes = newSchema.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    for (let key in oldTypes) {
      if (
        !newTypes[key] ||
        (oldTypes[key].type.length > newTypes[key].type.length &&
          oldTypes[key].parameters === undefined &&
          newTypes[key].parameters === undefined)
      ) {
        return "major";
      }
    }
  }

  function checkNewFunctionType() {
    const oldTypes = oldSchema.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    const newTypes = newSchema.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    for (let key in oldTypes) {
      if (
        oldTypes[key].type.length < newTypes[key].type.length &&
        oldTypes[key].parameters !== undefined &&
        newTypes[key].parameters !== undefined
      ) {
        return "minor";
      }
    }
  }

  function checkRemovedFunctionType() {
    const oldTypes = oldSchema.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    const newTypes = newSchema.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    for (let key in oldTypes) {
      if (
        !newTypes[key] ||
        (oldTypes[key].type.length > newTypes[key].type.length &&
          oldTypes[key].parameters !== undefined &&
          newTypes[key].parameters !== undefined)
      ) {
        return "minor";
      }
    }
  }

  let changeType = undefined;

  const checks = [
    { name: "checkRemovedType", fn: checkRemovedType },
    { name: "checkRemovedFunction", fn: checkRemovedFunction },
    { name: "checkRemovedFunctionType", fn: checkRemovedFunctionType },
    { name: "checkNewType", fn: checkNewType },
    { name: "checkNewFunction", fn: checkNewFunction },
    { name: "checkNewFunctionType", fn: checkNewFunctionType },
    { name: "checkDoc", fn: checkDoc },
  ];

  for (const check of checks) {
    const result = check.fn();
    if (result) {
      if (result === "major" && changeType !== "major") {
        changeType = result;
        break;
      } else if (result === "minor" && changeType !== "minor") {
        changeType = result;
        break;
      }
      changeType = result;
    }
  }

  return changeType ?? "major";
}

// oldSchema
const oldSchema = [
  {
    name: "testVariable",
    documentation: "tsdoc comment.",
    type: "string",
  },
  {
    name: "testArrowFunction",
    documentation: "tsdoc comment.",
    type: "(a: string, b: number) => void",
    parameters: [
      {
        name: "a",
        documentation: "- The first parameter.",
        type: "string",
      },
      {
        name: "b",
        documentation: "- The second parameter.",
        type: "number",
      },
    ],
    returnType: "void",
  },
];

// newSchema
const newSchema = [
  {
    name: "testVariable",
    documentation: "tsdoc comment.",
    type: "string",
  },
  {
    name: "testArrowFunction",
    type: "(a: string, b: number) => void",
    parameters: [
      {
        name: "a",
        documentation: "- The first parameter.",
        type: "string",
      },
      {
        name: "b",
        documentation: "- The second parameter.",
        type: "number",
      },
    ],
    returnType: "void",
  },
];

module.exports = solution;

console.log(module.exports(oldSchema, newSchema));
