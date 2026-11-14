import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest{
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase{

  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository){}

  async execute({name, description}: IRequest):Promise<void>{
    const specificationAlReadyExists = await this.specificationsRepository.findByName(name)

    if(specificationAlReadyExists){
      throw new AppError("Specification already exists!")
    }

    await this.specificationsRepository.create({
      name,
      description
    })
  }
}

export { CreateSpecificationUseCase }