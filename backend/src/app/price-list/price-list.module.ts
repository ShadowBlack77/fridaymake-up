import { Module } from "@nestjs/common";
import { PriceListController } from "./controllers/price-list.controller";
import { PriceListService } from "./repository/price-list.service";

@Module({
  controllers: [PriceListController],
  providers: [PriceListService]
})
export class PriceListModule {}