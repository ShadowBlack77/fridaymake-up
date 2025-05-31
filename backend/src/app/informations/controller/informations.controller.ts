import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { InformationsService } from "../repository/informations.service";
import { SkinTypes } from "../domain/skin-types.model";

@Controller({
  path: 'informations'
})
export class InformationsController {

  constructor(private readonly _informationsService: InformationsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<SkinTypes[]> {
    return await this._informationsService.getAll();
  }
}