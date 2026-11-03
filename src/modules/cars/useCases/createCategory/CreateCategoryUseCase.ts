import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IRequest{
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor( private categoriesReposiry: ICategoriesRepository){}

  execute({ description, name}: IRequest):void{
    const categoryAlreadyExists = this.categoriesReposiry.findByName(name)

    if(categoryAlreadyExists){
      throw new Error("Category already exists!")
    }

    this.categoriesReposiry.create({ name, description })
  }
}

export { CreateCategoryUseCase }