import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./importCategoryUseCase";
import { container } from "tsyringe";

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const file = request.file;

    if (!file) {
      return response.status(400).json({
        message: "Arquivo não enviado",
      });
    }

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}

export { ImportCategoryController };
