import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PortfolioService } from "../repository/portfolio.service";
import { Portfolio } from "../domain/portfolio.model";
import { Public } from "src/app/auth/decorators/public.decorator";

@Controller({
  path: 'portfolio'
})
export class PortfolioController {

  constructor(private readonly _portfolioService: PortfolioService) {}

  @Public()
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Portfolio[]> {
    return await this._portfolioService.getAll();
  }
}