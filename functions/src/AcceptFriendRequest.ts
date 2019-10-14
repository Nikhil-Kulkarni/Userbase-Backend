import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Callable } from './Callable';
import { 
    USERS_COLLECTION, 
    FRIENDS_COLLECTION, 
    INVITATIONS_COLLECTION 
} from './constants';

export class AcceptFriendRequestHandler extends Callable {
    
    run(req: functions.https.Request, res: functions.Response) {
        const token: string = req.body.token;
        const friendId: string = req.body.friendId;

        admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            const id: string = decodedToken.uid;
            const db: admin.firestore.Firestore = admin.firestore();

            const friendInfoOne = {
                id,
            };
            const friendInfoTwo = {
                id: friendId,
            };
            
            db.collection(USERS_COLLECTION).doc(friendId).collection(FRIENDS_COLLECTION).doc(id).set(friendInfoOne)
            .then((result) => {
                db.collection(USERS_COLLECTION).doc(id).collection(FRIENDS_COLLECTION).doc(friendId).set(friendInfoTwo)
                .then((result) => {
                    db.collection(USERS_COLLECTION).doc(id).collection(INVITATIONS_COLLECTION).doc(friendId).delete()
                    .then((result) => {
                        const response = {
                            success: true,
                        };
                        res.status(200).send(response);
                    })
                    .catch((error) => {
                        console.log('Error writing to db, ' + error);
                        res.status(500).send('Something went wrong');
                    })
                })
                .catch((error) => {
                    console.log('Error writing to db, ' + error);
                    res.status(500).send('Something went wrong');
                })
            })
            .catch((error) => {
                console.log('Error writing to db, ' + error);
                res.status(500).send('Something went wrong');
            })
        })
        .catch((error) => {
            console.log('Invalid token, ' + error);
            res.status(401).send('Unauthorized');
        })
    }
}