import express, { json } from "express"
import "./database"
import "./shared/container"
import { routes } from "./routes"
import swaggerUI from "swagger-ui-express"
import swaggerFile from "./swagger.json"

const app = express()

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(json())

app.use(routes)

const PORT = 3333

app.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`);
  
})