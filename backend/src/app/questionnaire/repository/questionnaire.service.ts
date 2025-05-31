import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";

@Injectable()
export class QuestionnaireService {
  
  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin) {}

  async getByUserId(userId: string) {
    try {
      const snapshot = await this._firebase.firestore.collection('questionnaires').where('userId', '==', userId).get();

      if (snapshot.empty) {
        throw new NotFoundException();
      }

      const questionnaire = snapshot.docs.map((doc) => doc.data())[0];

      return questionnaire;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(userId: string, questionnaireDto: any) {
    try {
      const docRef = this._firebase.firestore.collection('questionnaires').doc();
      const id = docRef.id;

      const data = {
        ...questionnaireDto,
        id,
        userId,
        isClosed: false,
        createdAt: new Date(),
      }

      await docRef.set(data);

      return;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(userId: string, updtQuestionnaireDto: any) {
    try {
      
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}