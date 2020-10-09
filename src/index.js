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
