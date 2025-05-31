import { Module } from "@nestjs/common";
import { CertificatesController } from "./controller/certificates.controller";
import { CertificatesService } from "./repository/certificates.service";

@Module({
  controllers: [CertificatesController],
  providers: [CertificatesService]
})
export class CertificatesModule {}