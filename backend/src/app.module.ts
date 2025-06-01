import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PortfolioModule } from './app/portfolio/portfolio.module';
import { CertificatesModule } from './app/certificates/certificates.module';
import { InformationsModule } from './app/informations/informations.module';
import { PriceListModule } from './app/price-list/price-list.module';
import { AuthModule } from './app/auth/auth.module';
import { join } from 'path';
import { FirebaseModule } from 'nestjs-firebase';
import { QuestionnaireModule } from './app/questionnaire/questionnaire.module';
import { MailModule } from './app/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '/assets/secrets/.env'),
      isGlobal: true
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: join(__dirname, `/assets/secrets/${process.env.FIREBASE_CONFIG_FILE}`)
    }),
    AuthModule,
    MailModule,
    PortfolioModule,
    CertificatesModule,
    InformationsModule,
    PriceListModule,
    QuestionnaireModule,
  ],
})
export class AppModule {}
