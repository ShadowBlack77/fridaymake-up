import { Module } from "@nestjs/common";
import { InformationsController } from "./controller/informations.controller";
import { InformationsService } from "./repository/informations.service";

@Module({
  controllers: [InformationsController],
  providers: [InformationsService]
})
export class InformationsModule {}