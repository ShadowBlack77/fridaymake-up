import { Injectable } from "@nestjs/common";
import { SkinTypes } from "../domain/skin-types.model";

@Injectable()
export class InformationsService {

  private readonly _skinTypes: SkinTypes[] = [
    {
      id: '1',
      name: 'Mieszana',
      description: 'Może skłaniać się w kierunku skóry suchej lub tłustej. Należy stosować peelingi enzymatyczne, unikać kosmetyków z zawartością alkoholu, dbać o silne nawilżenie partii suchych, natomiast partie tłuste pielęgnować kosmetykami matująco-nawilżającymi.'
    },
    {
      id: '2',
      name: 'Trądzikowa',
      description: 'Najczęściej spotykana u młodzieży, ale nie tylko, bowiem trądzik występuje w różnych odmianach, tak- że w wieku dojrzałym, co ma związek z zaburzeniami gospodarki hormonalnej. W tym rodzaju cery występują widoczne stany zapalne, wypryski. Musimy bardzo uważać, by przed makijażem nie podrażnić takiej skóry zbyt silnymi, alkoholowymi produktami, musimy pamiętać też o stosowaniu normalizujących kosmetyków. Taka skóra bywa bardzo wrażliwa i skłonna do podrażnień, zaczerwienień.'
    },
    {
      id: '3',
      name: 'Mieszana',
      description: 'Może skłaniać się w kierunku skóry suchej lub tłustej. Należy stosować peelingi enzymatyczne, unikać kosmetyków z zawartością alkoholu, dbać o silne nawilżenie partii suchych, natomiast partie tłuste pielęgnować kosmetykami matująco-nawilżającymi.'
    },
    {
      id: '4',
      name: 'Mieszana',
      description: 'Może skłaniać się w kierunku skóry suchej lub tłustej. Należy stosować peelingi enzymatyczne, unikać kosmetyków z zawartością alkoholu, dbać o silne nawilżenie partii suchych, natomiast partie tłuste pielęgnować kosmetykami matująco-nawilżającymi.'
    }
  ]

  async getAll(): Promise<SkinTypes[]> {
    return this._skinTypes;
  }
}