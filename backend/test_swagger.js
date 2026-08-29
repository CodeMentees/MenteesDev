import swaggerJsdoc from "swagger-jsdoc";
console.log("Start swaggerJsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API Documentation", version: "1.0.0" }
  },
  apis: ["./controllers/*.js"],
};
const specs = swaggerJsdoc(options);
console.log("End swaggerJsdoc");
