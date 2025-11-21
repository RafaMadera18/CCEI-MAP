import { GetAllSpacesUseCase } from "@use-cases/get-all-spaces";
import { Space } from "@domain/entities";

export class MainController {

  constructor(
    private readonly getAllSpacesUseCase: GetAllSpacesUseCase
  ) {}

  getAllSpaces(): Space[] {
    return this.getAllSpacesUseCase.execute();
  }
}
