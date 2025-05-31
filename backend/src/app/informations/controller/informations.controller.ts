import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { InformationsService } from "../repository/informations.service";
import { SkinTypes } from "../domain/skin-types.model";
import { Public } from "src/app/auth/decorators/public.decorator";

@Controller({
  path: 'informations'
})
export class InformationsController {

  constructor(private readonly _informationsService: InformationsService) {}

  @Public()
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<SkinTypes[]> {
    return await this._informationsService.getAll();
  }
}