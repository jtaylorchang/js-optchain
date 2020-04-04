const oc = (optionalObj, schema) => {
  if (
    optionalObj == undefined ||
    schema == undefined ||
    schema.constructor !== Object
  ) {
    return schema;
  }

  const obj = schema;

  const entries = Object.entries(schema);

  for (const [key, value] of entries) {
    if (optionalObj[key] != undefined) {
      if (value.constructor === Object) {
        obj[key] = oc(optionalObj[key], value);
      } else {
        obj[key] = optionalObj[key];
      }
    }
  }

  return obj;
};

export default oc;
