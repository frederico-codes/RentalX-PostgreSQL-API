import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;

    if (!file) {
      return response.status(400).json({
        error: "Nenhum arquivo enviado",
      });
    }

    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };