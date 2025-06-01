import { Module } from "@nestjs/common";
import { MailService } from "./repository/mail.service";

@Module({
  imports: [
    
  ],
  providers: [MailService]
})
export class MailModule {}