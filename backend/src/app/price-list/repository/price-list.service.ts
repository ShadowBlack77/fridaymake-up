import { Injectable } from "@nestjs/common";
import { Price } from "../domain/price.model";

@Injectable()
export class PriceListService {

  private readonly _priceList: Price[] = [
        {
      "id": '1',
      "imageUrl": 'q_auto,f_auto/v1739555476/makijaz-biznesowy_e5red1.jpg',
      "price": 160,
      "description": "Subtelny makijaż, który podkreśla i wydobywa naturalne piękno urody.",
      "name": "Makijaż dzienny"
    },
    {
      "id": '2',
      "imageUrl": 'q_auto,f_auto/v1739555476/makijaz-biznesowy_e5red1.jpg',
      "price": 180,
      "description": "Bardziej wyrazisty makijaż, gdzie akcent pada głównie na mocniejsze oczy lub usta, Idealny na np. studniówki, rożnego rodzaju imprezy czy eleganckie wyjścia.",
      "name": "Makijaż wieczorowy"
    },
    {
      "id": '3',
      "imageUrl": 'q_auto,f_auto/v1739555476/makijaz-biznesowy_e5red1.jpg',
      "price": 200,
      "description": "Jest to makijaż łączący cechy makijażu dziennego lub wieczorowego (w zależności od wizji klientki) z makijażem fotograficznym. Makijaż ten cechuje się wysoką trwałością oraz większą intensywnością (na co zawsze uczulam klientki) ze względu na obecność robionych zdjęć czy video podczas ślubu i wesela.",
      "name": "Makijaż ślubny"
    },
    {
      "id": '4',
      "imageUrl": 'q_auto,f_auto/v1739555476/makijaz-biznesowy_e5red1.jpg',
      "price": 180,
      "description": "Rodzaj makijażu, który jest bardziej efektowny i spektakularny, można tutaj bardziej poszaleć pod względem kolorów, błysku czy graficznych akcentów.",
      "name": "Makijaż sylwestrowy"
    },
    {
      "id": '5',
      "imageUrl": 'q_auto,f_auto/v1739555476/makijaz-biznesowy_e5red1.jpg',
      "price": 180,
      "description": "Makijaż biznesowy to typ makijażu dziennego, który jest preferowany w środowisku biznesowym, zazwyczaj jest wykonany głównie w matach oraz stawia się w nim na stonowane kolory takie jak beże czy brązy.",
      "name": "Makijaż biznesowy"
    },
    {
      "id": '6',
      "imageUrl": 'q_auto,f_auto/v1739555476/makijaz-biznesowy_e5red1.jpg',
      "price": 180,
      "description": "Makijaż ten charakteryzuje się o wiele większą intensywnością, stawia się tutaj na mocny kontur twarzy jak i mocniejszy makijaż oka, aby w oczach aparatu makijaż był widoczny, ponieważ aparat „zjada” prawie połowę intensywności naszego makeup-u.",
      "name": "Makijaż fotograficzny"
    },
    {
      "id": '7',
      "imageUrl": 'q_auto,f_auto/v1739555476/makijaz-biznesowy_e5red1.jpg',
      "price": 200,
      "description": "W tym rodzaju makijażu jedyne co nas ogranicza to nasza wobraźnia. Graficzne elementy, błyskotki, wszelakie dodatki jak i dużo kolorów to zdecydowanie klimaty makijażu artystycznego.",
      "name": "Makijaż artystyczny"
    },
    {
      "id": '8',
      "imageUrl": 'q_auto,f_auto/v1739555476/makijaz-biznesowy_e5red1.jpg',
      "price": 180,
      "description": "Jest to makijaż bardzo intensywny oraz trwały. Wykonuje się go z myślą o bardzo ciemnych pomieszczeniach, w których intensywne, punktowe światło skierowane jest prosto na twarz. Posiada jednak różne odmiany takie jak: makijaż telewizyjny czy Make-up gwiazd na różnego rodzaju eventy, ścianki itp.",
      "name": "Makijaż sceniczny"
    },
    {
      "id": '9',
      "imageUrl": 'q_auto,f_auto/v1739555476/makijaz-biznesowy_e5red1.jpg',
      "price": 80,
      "description": "Makijaż ten jest niezauważalny, ważne jest tutaj aby koloryt skóry został wyrównany oraz żeby niedoskonałości były mniej widoczne. Wykorzystuje się go najczęściej na panach młodych, w TV czy kiedy klient wybiera się na sesję zdjęciową.",
      "name": "Makijaż korekcyjny mężczyzn"
    }
  ]

  async getAll(): Promise<Price[]> {
    return this._priceList;
  }
}