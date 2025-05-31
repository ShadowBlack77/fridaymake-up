import { Injectable } from "@nestjs/common";
import { Portfolio } from "../domain/portfolio.model";

@Injectable()
export class PortfolioService {

  private readonly _portfolioImgs: Portfolio[] = [
    {
      id: '1',
      imageUrl: 'q_auto,f_auto/v1739556975/zdj1_qazx0y.jpg'
    },
    {
      id: '2',
      imageUrl: 'q_auto,f_auto/v1739556211/makijaz-wieczorowy_mrbztp.jpg'
    },
    {
      id: '3',
      imageUrl: 'q_auto,f_auto/v1739555464/makijaz-artystyczny_aqxhwo.jpg'
    },
    {
      id: '4',
      imageUrl: 'q_auto,f_auto/v1739557020/zdj4_tuwwc2.jpg'
    },
    {
      id: '5',
      imageUrl: 'q_auto,f_auto/v1739557034/zdj5_cr6jze.jpg'
    },
    {
      id: '6',
      imageUrl: 'q_auto,f_auto/v1739557049/zdj6_mgdwz6.jpg'
    },
    {
      id: '7',
      imageUrl: 'q_auto,f_auto/v1739557061/zdj7_liq39g.jpg'
    },
    {
      id: '8',
      imageUrl: 'q_auto,f_auto/v1739557075/zdj8_brf75x.jpg'
    },
    {
      id: '9',
      imageUrl: 'q_auto,f_auto/v1739557091/zdj9_gly7cu.jpg'
    },
    {
      id: '10',
      imageUrl: 'q_auto,f_auto/v1739557107/zdj10_vrzcap.jpg'
    },
    {
      id: '11',
      imageUrl: 'q_auto,f_auto/v1739557124/zdj11_fl9bqo.jpg'
    },
    {
      id: '12',
      imageUrl: 'q_auto,f_auto/v1739556132/makijaz-sylwestrowy_rxvxrv.jpg'
    },
    {
      id: '13',
      imageUrl: 'q_auto,f_auto/v1739557176/zdj13_tvnsto.jpg'
    },
    {
      id: '14',
      imageUrl: 'q_auto,f_auto/v1739557202/zdj14_uqzxld.jpg'
    },
    {
      id: '15',
      imageUrl: 'q_auto,f_auto/v1739556317/sesje-zdjeciowe_ermtyu.jpg'
    },
    {
      id: '16',
      imageUrl: 'q_auto,f_auto/v1739557226/zdj16_tujgzf.jpg'
    },
    {
      id: '17',
      imageUrl: 'q_auto,f_auto/v1739556290/makijaz-dzienny_juuybi.jpg'
    },
    {
      id: '18',
      imageUrl: 'q_auto,f_auto/v1739557247/zdj18_znvice.jpg'
    },
    {
      id: '19',
      imageUrl: 'q_auto,f_auto/v1739557259/zdj19_jxwgea.jpg'
    },
    {
      id: '20',
      imageUrl: 'q_auto,f_auto/v1739557279/zdj20_uttykt.jpg'
    },
    {
      id: '21',
      imageUrl: 'q_auto,f_auto/v1739557287/zdj21_ubuywp.jpg'
    },
    {
      id: '22',
      imageUrl: 'q_auto,f_auto/v1739556789/zdj22_con8b0.jpg'
    },
    {
      id: '23',
      imageUrl: 'q_auto,f_auto/v1739556806/zdj23_sidxw4.jpg'
    },
    {
      id: '24',
      imageUrl: 'q_auto,f_auto/v1739557335/zdj24_xus3pl.jpg'
    },
    {
      id: '25',
      imageUrl: 'q_auto,f_auto/v1739557350/zdj25_zymqcw.jpg'
    }
  ]

  async getAll(): Promise<Portfolio[]> {
    return this._portfolioImgs;
  }
}