import { Injectable } from "@nestjs/common";
import { Certificate } from "../domain/certificate.model";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";

@Injectable()
export class CertificatesService {

  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin) {}

  async getAll(): Promise<Certificate[]> {
    const collectionRef = this._firebase.firestore.collection('certificates');
    
    return (await collectionRef.get()).docs.map((doc) => doc.data() as Certificate);
  }
}