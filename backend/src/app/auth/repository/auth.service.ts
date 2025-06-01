import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { Login } from "../domain/login.model";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";
import { FIREBASE_UTILS, FirebaseUtils } from "src/app/firebase/utils/firebase.utils";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Register } from "../domain/register.model";
import { MailService } from "src/app/mail/repository/mail.service";

@Injectable()
export class AuthService {

  constructor(
    @InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin,
    @Inject(FIREBASE_UTILS) private readonly _firebaseUtils: FirebaseUtils,
    private readonly _mailService: MailService
  ) {}

  async login(res: Response, loginDto: Login) {
    try {

      const { accessToken, refreshToken } = await this._firebaseUtils.signInWithEmailAndPassword(loginDto);

      await this.setAccessTokenCookie(res, accessToken);
      await this.setRefreshTokenCookie(res, refreshToken);

      return;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async register(registerDto: Register) {
    try {
      const createdUser = await this._firebase.auth.createUser({
        email: registerDto.email,
        password: registerDto.password
      });

      const userRef = this._firebase.firestore.collection('users').doc(createdUser.uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        await userRef.create({
          uid: createdUser.uid,
          username: registerDto.username,
          email: registerDto.email
        });
      }

      return;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async logout(res: Response) {
    res.clearCookie('access-token');
    res.clearCookie('refresh-token');

    return;
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['refresh-token'];

      if (!refreshToken) {
        throw new UnauthorizedException('Session Expired')
      }

      const { accessToken } = await this._firebaseUtils.refreshToken(refreshToken);

      await this.setAccessTokenCookie(res, accessToken);

      return;
    } catch (error) {
      return new UnauthorizedException('Session Expired');
    }
  }

  async profile(userId: string) {
    const userDoc = await this._firebase.firestore.doc(`users/${userId}`).get();

    return userDoc.data();
  }

  async verifyIdToken(accessToken: string): Promise<DecodedIdToken> {
    const decodedToken = await this._firebase.auth.verifyIdToken(accessToken);

    return decodedToken;
  }

  async resetPassword(resetPasswordDto: { email: string }) {
    const { email } = resetPasswordDto;

    const resetLink = await this._firebase.auth.generatePasswordResetLink(email);

    this._mailService.sendMail(email, 'Resetowanie hasła', 'reset-password', { link: resetLink });

    return;
  }

  private async setAccessTokenCookie(res: Response, accessToken: string): Promise<void> {
    res.cookie('access-token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 5 * 60 * 1000
    });
  }

  private async setRefreshTokenCookie(res: Response, refreshToken: string): Promise<void> {
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
  }
}