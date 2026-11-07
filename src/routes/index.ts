import { Router } from "express";
import { categoriesRouter } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const routes = Router()

routes.use("/categories", categoriesRouter)
routes.use("/specifications", specificationRoutes)
routes.use("/users", usersRoutes)




export { routes }