import { Injectable } from "@nestjs/common";
import { Price } from "../domain/price.model";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";

@Injectable()
export class PriceListService {

  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin) {}

  async getAll(): Promise<Price[]> {
    const collectionRef = this._firebase.firestore.collection('price-list');

    return (await collectionRef.get()).docs.map((doc) => doc.data() as Price);
  }
}