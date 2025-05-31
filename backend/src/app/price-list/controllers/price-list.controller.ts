import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { Price } from "../domain/price.model";
import { PriceListService } from "../repository/price-list.service";
import { Public } from "src/app/auth/decorators/public.decorator";

@Controller({
  path: 'price-list'
})
export class PriceListController {

  constructor(private readonly _priceListService: PriceListService) {}

  @Public()
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Price[]> {
    return await this._priceListService.getAll();
  }
}