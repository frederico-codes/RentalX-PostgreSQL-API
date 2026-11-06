import { inject, injectable } from "tsyringe"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"

interface IRequest{
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor( 
    @inject(CategoriesRepository)
    private categoriesReposiry: ICategoriesRepository){}

  async execute({ description, name}: IRequest):Promise<void>{
    const categoryAlreadyExists = await this.categoriesReposiry.findByName(name)

    if(categoryAlreadyExists){
      throw new Error("Category already exists!")
    }

    this.categoriesReposiry.create({ name, description })
  }
}

export { CreateCategoryUseCase }