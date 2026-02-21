import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import mongoose from "mongoose";
import { generateSwaggerSchema } from "./utils/generateSwaggerSchema.js"; // Utility to generate schemas

const router = express.Router();

// Generate Swagger schemas dynamically for all Mongoose models
const schemas = {};
for (const modelName of Object.keys(mongoose.models)) {
  const model = mongoose.models[modelName];
  schemas[modelName] = generateSwaggerSchema(model);
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Automatically generated Swagger documentation for the API",
    },
    components: {
      schemas, // Inject generated schemas into Swagger
    },
  },
  apis: ["./controllers/*.js"], // Scan controller files for API documentation
};

const specs = swaggerJsdoc(options);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

export default router;
