import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Student Tracker API", version: "1.0.0" },
  },
  apis: ["./src/api/v1/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
