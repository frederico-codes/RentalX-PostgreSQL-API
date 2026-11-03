import { Router } from "express";
import { categoriesRouter } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";

const routes = Router()

routes.use("/categories", categoriesRouter)
routes.use("/specifications", specificationRoutes)





export { routes }