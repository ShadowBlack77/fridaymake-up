import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CertificatesService } from "../repository/certificates.service";
import { Certificate } from "../domain/certificate.model";

@Controller({
  path: 'certificates'
})
export class CertificatesController {

  constructor(private readonly _certificatesService: CertificatesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Certificate[]> {
    return await this._certificatesService.getAll();
  }
}