import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { Login } from "../domain/login.model";
import { AuthService } from "../repository/auth.service";
import { Register } from "../domain/register.model";
import { Public } from "../decorators/public.decorator";
import { getUserIdOrThrow } from "src/app/core/http/validation";

@Controller({
  path: 'auth'
})
export class AuthController {

  constructor(private readonly _authService: AuthService) {}
  
  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Res({ passthrough: true }) res: Response, @Body() loginDto: Login) {
    return await this._authService.login(res, loginDto);
  }

  @Public()
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: Register) {
    return await this._authService.register(registerDto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this._authService.logout(res);
  }

  @Public()
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this._authService.refresh(req, res);
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async profile(@Res({ passthrough: true }) res: Response) {
    const userId = getUserIdOrThrow(res);

    return await this._authService.profile(userId);
  }

  @Public()
  @Post('/reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(@Body() resetPasswordDto: { email: string }) {
    return await this._authService.resetPassword(resetPasswordDto);
  }
}