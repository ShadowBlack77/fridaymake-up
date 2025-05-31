import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./repository/auth.service";
import { AuthController } from "./controller/auth.controller";
import { FIREBASE_UTILS, FirebaseUtils } from "../firebase/utils/firebase.utils";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: FIREBASE_UTILS,
      useClass: FirebaseUtils
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AuthModule {}