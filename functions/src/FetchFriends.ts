import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Callable } from './Callable';
import { USERS_COLLECTION, FRIENDS_COLLECTION } from './constants';

export class FetchFriendsHandler extends Callable {
    
    run(req: functions.https.Request, res: functions.Response) {
        const token = req.body.token;

        admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            const id = decodedToken.uid;
            const db: admin.firestore.Firestore = admin.firestore();

            db.collection(USERS_COLLECTION).doc(id).collection(FRIENDS_COLLECTION).doc()
        })
        .catch((error) => {
            console.log('Error decoding token, ' + error);
            res.status(500).send('Invalid token');
        })
    }
}