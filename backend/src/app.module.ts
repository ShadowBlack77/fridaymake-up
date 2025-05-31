import { Module } from '@nestjs/common';
import { PortfolioModule } from './app/portfolio/portfolio.module';
import { CertificatesModule } from './app/certificates/certificates.module';
import { InformationsModule } from './app/informations/informations.module';

@Module({
  imports: [
    PortfolioModule,
    CertificatesModule,
    InformationsModule
  ],
})
export class AppModule {}
