# js-optchain

The first argument is as far into the chain as you can get with confidence that your final child is the only one that may be optional.

The second argument is the schema of its optional chain with default values.

The returned result is an object that will match the schema and have default values if none could be populated.

Therefore, all of these inputs are valid:

```javascript
const handler1 = {
  event: {}
};

const handler2 = {
  event: {
    body: {}
  }
};

const handler3 = {
  event: {
    body: {
      username: "jeff"
    }
  }
};

const handler4 = {
  event: {
    body: {
      username: "jeff",
      password: "password"
    }
  }
};

const ocBody1 = oc(handler1.event.body, {
  username: "defaultUsername",
  password: "defaultPassword"
});
const ocBody2 = oc(handler2.event.body, {
  username: "defaultUsername",
  password: "defaultPassword"
});
const ocBody3 = oc(handler3.event.body, {
  username: "defaultUsername",
  password: "defaultPassword"
});
const ocBody4 = oc(handler4.event.body, {
  username: "defaultUsername",
  password: "defaultPassword"
});

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
```
