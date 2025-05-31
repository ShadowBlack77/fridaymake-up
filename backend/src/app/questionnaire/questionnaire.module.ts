import { Module } from "@nestjs/common";
import { QuestionnaireController } from "./controller/questionnaire.controller";
import { QuestionnaireService } from "./repository/questionnaire.service";

@Module({
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService]
})
export class QuestionnaireModule {}