import { Router } from "express";
import { categoriesRouter } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";

const routes = Router()

routes.use("/categories", categoriesRouter)
routes.use("/specifications", specificationRoutes)





export { routes }