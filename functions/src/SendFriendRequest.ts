import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Callable } from './Callable';
import { USERS_COLLECTION, INVITATIONS_COLLECTION } from './constants';

export class SendFriendRequestHandler extends Callable {
    
    run(req: functions.https.Request, res: functions.Response) {
        const token: string = req.body.token;
        const toId: string = req.body.id;

        admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            const id: string = decodedToken.uid;
            const db: admin.firestore.Firestore = admin.firestore();

            const invitation = {
                id,
            };
            db.collection(USERS_COLLECTION).doc(toId).collection(INVITATIONS_COLLECTION).doc(id).set(invitation)
            .then((result) => {
                const response = { 
                    success: true,
                };
                res.status(200).send(response);
            })
            .catch((error) => {
                console.log('Failed to write to db, ' + error);
                res.status(500).send('Something went wrong');
            })
        })
        .catch((error) => {
            console.log('Error verifying token, ' + error)
            res.status(401).send('Invalid token');
        })
    }
}