import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request, Response } from "express";
import { AuthService } from "../repository/auth.service";
import { PUBLIC_TOKEN } from "../decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly _authService: AuthService,
    private readonly _reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const isPublic = this._reflector.getAllAndOverride<boolean>(PUBLIC_TOKEN, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const accessToken = request.cookies['access-token'];

    if (!accessToken) {
      throw new ForbiddenException('Invalid token');
    }

    try {
      const decodedToken = await this._authService.verifyIdToken(accessToken);

      response.locals.userId = decodedToken.uid;

      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }
}