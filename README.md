# js-optchain

![](https://img.shields.io/npm/v/js-optchain) ![](https://img.shields.io/bundlephobia/min/js-optchain) ![](https://img.shields.io/npm/l/js-optchain) ![](https://img.shields.io/npm/dt/js-optchain)

This package adds schema-based optional chaining to javascript. Simply wrap the object with the `oc` and define your default schema. This will create an object containing all fields **specified in the schema** with the existing values or default ones from the schema if the data is undefined. The optional chain is recursively generated so schemas can be multi-level. See [Usage](#Usage) for examples.

## Installation

NPM:

```bash
npm install js-optchain
```

Yarn:

```bash
yarn add js-optchain
```

### Importing:

With **import**:

```javascript
import oc from "js-optchain";
```

With **require**:

```javascript
const oc = require("js-optchain").default;
```

## Usage

```javascript
/**
 * Wrap an object with optional properties which should have default values if undefined.
 *
 * To use partials, set the element in the schema to `{}`
 *
 * Partials are enabled by default. If partials are not enabled, the output will strictly match the schema shape.
 *
 * @param {*} optionalObj The object to wrap
 * @param {*} schema The schema with default values which should be returned
 * @param {*} allowPartials (Optional) True if elements in the wrapped object should be included even if they don't appear in the schema
 */
const ocObj = oc(obj, schema, allowPartials);
```

- The first argument is the object you want to explore that may or may not be `undefined`.
- The second argument is the schema of its optional chain with default values.
- There is an optional third argument that defaults to true and allows partial schemas (see handler/ocBody 6 below for an example)
- The returned result is an object that will match the schema and have default values if the found values are `undefined`. This can include nested objects, see examples below.

## Examples

Below are a series of examples that match the following. To view an example, see the `handler`, `oc()` and `console.log` for each number to see what the expected inputs and outputs are.

- `ocBody1`: Passing an undefined object into the `oc` wrapper (object is undefined)
- `ocBody2`: Passing an empty object into the `oc` wrapper (object has none of the schema properties)
- `ocBody3`: Passing a partial object into the `oc` wrapper (object only has some of the schema properties)
- `ocBody4`: Passing a complete object into the `oc` wrapper (object has all the schema properties)
- `ocBody5`: Passing a nested object into the `oc` wrapper (schema contains multiple layers)
- `ocEvent5`: Passing a more complex object into the `oc` wrapper
- `ocEvent6`: Passing an object into the `oc` wrapper with partials
- `ocEvent6NoPartials`: Passing an object into the `oc` wrapper with partials disabled

Therefore, all of these inputs are valid:

```javascript
// import oc from "js-optchain";
const oc = require("js-optchain").default;

const handler1 = {
  event: {},
};

const handler2 = {
  event: {
    body: {},
  },
};

const handler3 = {
  event: {
    body: {
      username: "jeff",
    },
  },
};

const handler4 = {
  event: {
    body: {
      username: "jeff",
      password: "password",
    },
  },
};

const handler5 = {
  event: {
    body: {
      user: {
        username: "jeff",
      },
    },
  },
};

const handler6 = {
  event: {
    body: {
      user: {
        username: "jeff",
        password: "password",
      },
    },
  },
};

const ocBody1 = oc(handler1.event.body, {
  username: "defaultUsername",
  password: "defaultPassword",
});
const ocBody2 = oc(handler2.event.body, {
  username: "defaultUsername",
  password: "defaultPassword",
});
const ocBody3 = oc(handler3.event.body, {
  username: "defaultUsername",
  password: "defaultPassword",
});
const ocBody4 = oc(handler4.event.body, {
  username: "defaultUsername",
  password: "defaultPassword",
});
const ocBody5 = oc(handler5.event.body, {
  user: {
    username: "defaultUsername",
    password: "defaultPassword",
  },
});
const ocEvent5 = oc(handler5.event, {
  body: {
    user: {
      username: "defaultUsername",
      password: "defaultPassword",
    },
    config: {
      isAdmin: true,
    },
  },
});
const ocEvent6 = oc(
  handler6.event,
  {
    body: {
      user: {},
    },
  },
  false
);
const ocEvent6NoPartials = oc(
  handler6.event,
  {
    body: {
      user: {},
    },
  },
  false
);

console.log(
  ocBody1.username === "defaultUsername" &&
    ocBody1.password === "defaultPassword"
);
console.log(
  ocBody2.username === "defaultUsername" &&
    ocBody2.password === "defaultPassword"
);
console.log(
  ocBody3.username === "jeff" && ocBody3.password === "defaultPassword"
);
console.log(ocBody4.username === "jeff" && ocBody4.password === "password");
console.log(
  ocBody5.user.username === "jeff" &&
    ocBody5.user.password === "defaultPassword"
);
console.log(
  ocEvent5.body.user.username === "jeff" &&
    ocEvent5.body.user.password === "defaultPassword" &&
    ocEvent5.body.config.isAdmin === true
);
console.log(
  ocEvent6.body.user.username === "jeff" &&
    ocEvent6.body.user.password === "password"
);
console.log(ocEvent6NoPartials.body.user === {});
```
