const oc = (optionalObj, schema, allowPartials = true) => {
  if (
    optionalObj === null ||
    optionalObj === undefined ||
    schema === null ||
    schema === undefined ||
    schema.constructor !== Object
  ) {
    return schema;
  }

  const obj = schema;

  if (
    allowPartials &&
    schema.constructor === Object &&
    Object.keys(schema).length === 0
  ) {
    return optionalObj;
  }

  const entries = Object.entries(schema);

  for (const [key, value] of entries) {
    if (optionalObj[key] !== undefined) {
      if (
        value !== null &&
        value !== undefined &&
        value.constructor === Object
      ) {
        obj[key] = oc(optionalObj[key], value, allowPartials);
      } else {
        obj[key] = optionalObj[key];
      }
    }
  }

  return obj;
};

export default oc;
