import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CertificatesService } from "../repository/certificates.service";
import { Certificate } from "../domain/certificate.model";
import { Public } from "src/app/auth/decorators/public.decorator";

@Controller({
  path: 'certificates'
})
export class CertificatesController {

  constructor(private readonly _certificatesService: CertificatesService) {}

  @Public()
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Certificate[]> {
    return await this._certificatesService.getAll();
  }
}