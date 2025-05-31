import { Module } from "@nestjs/common";
import { PortfolioController } from "./controller/portfolio.controller";
import { PortfolioService } from "./repository/portfolio.service";

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService]
})
export class PortfolioModule {}