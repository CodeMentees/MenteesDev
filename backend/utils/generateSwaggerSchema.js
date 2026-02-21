export const generateSwaggerSchema = (mongooseModel) => {
  if (!mongooseModel || !mongooseModel.schema || !mongooseModel.schema.obj) {
    console.error("Invalid Mongoose model:", mongooseModel);
    return { type: "object", properties: {} };
  }

  const schema = mongooseModel.schema.obj;
  const swaggerSchema = {
    type: "object",
    properties: {},
    required: [],
  };

  for (const [key, value] of Object.entries(schema)) {
    if (!value) continue;

    // Handle arrays explicitly
    if (Array.isArray(value.type)) {
      const itemType = mapMongooseTypeToSwaggerType(value.type[0]);
      swaggerSchema.properties[key] = {
        type: "array",
        items: { type: itemType },
      };
    }
    // Handle objects explicitly
    else if (typeof value.type === "object" && !Array.isArray(value.type)) {
      swaggerSchema.properties[key] = { type: "object", properties: {} };
      for (const [subKey, subValue] of Object.entries(value.type)) {
        swaggerSchema.properties[key].properties[subKey] = {
          type: mapMongooseTypeToSwaggerType(subValue),
        };
      }
    }
    // Normal primitive types
    else {
      swaggerSchema.properties[key] = {
        type: mapMongooseTypeToSwaggerType(value.type),
      };
    }

    // Add required fields
    if (value.required) {
      swaggerSchema.required.push(key);
    }
  }

  return swaggerSchema;
};

const mapMongooseTypeToSwaggerType = (mongooseType) => {
  if (mongooseType === String) return "string";
  if (mongooseType === Number) return "number";
  if (mongooseType === Boolean) return "boolean";
  if (mongooseType === Date) return "string"; // Swagger treats dates as strings
  if (Array.isArray(mongooseType) || mongooseType === Array) return "array";
  if (typeof mongooseType === "object" && !Array.isArray(mongooseType))
    return "object";
  return "string"; // Default to string
};
