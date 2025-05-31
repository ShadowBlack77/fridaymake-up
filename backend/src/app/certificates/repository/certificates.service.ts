import { Injectable } from "@nestjs/common";
import { Certificate } from "../domain/certificate.model";

@Injectable()
export class CertificatesService {

  private readonly _certificates: Certificate[] = [
    {
      id: '1',
      imageUrl: 'q_auto,f_auto/v1739557800/CCF20231205_00001_lgdzgu.jpg'
    },
    {
      id: '2',
      imageUrl: 'q_auto,f_auto/v1739557810/CCF20231205_00002_oaqa2d.jpg'
    },
    {
      id: '3',
      imageUrl: 'q_auto,f_auto/v1739557819/CCF20231205_00003_kd3d2n.jpg'
    },
    {
      id: '4',
      imageUrl: 'q_auto,f_auto/v1739557845/CCF20231205_00006_brszhe.jpg'
    },
    {
      id: '5',
      imageUrl: 'q_auto,f_auto/v1739557828/CCF20231205_00004_vkwcs0.jpg'
    },
    {
      id: '6',
      imageUrl: 'q_auto,f_auto/v1739557836/CCF20231205_00005_uwfikx.jpg'
    },
    {
      id: '7',
      imageUrl: 'q_auto,f_auto/v1739557850/certyfikat-do-wklejenia_affibi.jpg'
    },
    {
      id: '8',
      imageUrl: 'q_auto,f_auto/v1739557857/Zrzut_ekranu_2023-12-05_220837_myj2m0.jpg'
    }
  ];

  async getAll(): Promise<Certificate[]> {
    return this._certificates;
  }
}