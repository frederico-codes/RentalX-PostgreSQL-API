import express, { json, response } from "express";
import "./database";
import "./shared/container";
import "express-async-errors";
import { routes } from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/AppError";

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(json());

app.use(routes);

const PORT = 3333;



app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    
    return response.status(500).json({
      status: "error",
      message: `Internal server - ${err.message}`,
    });
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
