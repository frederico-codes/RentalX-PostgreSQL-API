import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { AppError } from "@errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject(CategoriesRepository)
    private categoriesReposiry: ICategoriesRepository,
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists =
      await this.categoriesReposiry.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!",400);
    }

    this.categoriesReposiry.create({ name, description });
  }
}

export { CreateCategoryUseCase };
