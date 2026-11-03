import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepostory = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepostory)
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)


export { listCategoriesController}