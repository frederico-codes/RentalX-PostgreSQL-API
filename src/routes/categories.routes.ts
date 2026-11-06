import { Router } from "express";
import multer from "multer";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/importCategoryController";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRouter = Router();
const upload = multer({
  dest: "./tmp",
});

const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.get("/", listCategoriesController.handle);

categoriesRouter.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle,
);

export { categoriesRouter };
