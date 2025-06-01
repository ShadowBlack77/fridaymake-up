import { Injectable } from "@nestjs/common";
import { SkinTypes } from "../domain/skin-types.model";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";

@Injectable()
export class InformationsService {

  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin) {}

  async getAll(): Promise<SkinTypes[]> {
    const collectionRef = this._firebase.firestore.collection('skin-types');

    return (await collectionRef.get()).docs.map((doc) => doc.data() as SkinTypes);
  }
}