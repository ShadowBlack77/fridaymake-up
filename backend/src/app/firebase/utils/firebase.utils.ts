import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Login } from "src/app/auth/domain/login.model";
import { Tokens } from "../models/tokens.model";

export const FIREBASE_UTILS: string = 'FIREBASE_UTILS';

@Injectable()
export class FirebaseUtils {

  async signInWithEmailAndPassword(loginDto: Login): Promise<Tokens> {
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
        email: loginDto.email,
        password: loginDto.password,
        returnSecureToken: true
      });

      const data = await response.data;

      return { accessToken: data.idToken, refreshToken: data.refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const refreshResponse = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
      grant_type: "refresh_token",
      refresh_token: refreshToken
    });

    return { accessToken: refreshResponse.data['id_token'] };
  }
}