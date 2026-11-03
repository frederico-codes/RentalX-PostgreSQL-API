import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationUseCase } from "../modules/cars/useCases/createSpecification/CreateSpecificationUseCase";

const specificationRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationRoutes.post("/", (request, response) => {
  const { name, description } = request.body
  const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationsRepository
  )

  createSpecificationUseCase.execute({name, description})

  return response.status(201).send()
})

export { specificationRoutes }



