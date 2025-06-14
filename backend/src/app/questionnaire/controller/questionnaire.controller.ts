import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { QuestionnaireService } from "../repository/questionnaire.service";
import { Response } from "express";
import { getUserIdOrThrow } from "src/app/core/http/validation";

@Controller({
  path: 'questionnaire'
})
export class QuestionnaireController {

  constructor(private readonly _questionnaireService: QuestionnaireService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getByUserId(@Res({ passthrough: true }) res: Response) {
    const userId = getUserIdOrThrow(res);

    return await this._questionnaireService.getByUserId(userId);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Res({ passthrough: true }) res: Response, @Body() questionnaireDto: any) {
    const userId = getUserIdOrThrow(res); 

    return await this._questionnaireService.create(userId, questionnaireDto);
  }

  @Put('/:questionnaireId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() updtQuestionnaireDto: any, @Param('questionnaireId') questionnaireId: string) {
    return await this._questionnaireService.update(questionnaireId, updtQuestionnaireDto);
  }
}