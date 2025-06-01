import { Injectable, NotFoundException } from "@nestjs/common";
import { Portfolio } from "../domain/portfolio.model";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";

@Injectable()
export class PortfolioService {

  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin) {}

  async getAll(): Promise<Portfolio[]> {
    try {
      const collectionRef = this._firebase.firestore.collection('portfolio');

      return (await collectionRef.get()).docs.map((doc) => doc.data() as Portfolio);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}