import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Callable } from './Callable';
import { USERS_COLLECTION, FRIENDS_COLLECTION } from './constants';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export class FetchFriendsHandler extends Callable {
    
    run(req: functions.https.Request, res: functions.Response) {
        const token = req.body.token;

        admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            const id = decodedToken.uid;
            const db: admin.firestore.Firestore = admin.firestore();

            db.collection(USERS_COLLECTION).doc(id).collection(FRIENDS_COLLECTION).doc().listCollections()
            .then((result) => {
                const phoneNumberList: string[] = [];
                result.forEach((value) => {
                    const phoneNumber: string = value.id
                    phoneNumberList.push(phoneNumber);
                })
                const promiseArray: Array<Promise<DocumentSnapshot>> = []
                phoneNumberList.forEach((phoneNumber) => {
                    const query = db.collection(USERS_COLLECTION).doc(phoneNumber).get();
                    promiseArray.push(query);
                })
                Promise.all(promiseArray)
                .then((value) => {
                    const friends: any[] = [];
                    value.forEach((snapshot) => {
                        const firstName = snapshot.get("firstName");
                        const lastName = snapshot.get("lastName");
                        const developerMetadata = snapshot.get("developerMetadata");
                        const phoneNumber = snapshot.get("phoneNumber");

                        const user = {
                            firstName,
                            lastName,
                            developerMetadata,
                            phoneNumber
                        };
                        friends.push(user);
                    })

                    const response = {
                        friends,
                    };

                    res.send(response);
                })
                .catch((error) => {
                    console.log('Failed batch promise, ' + error);
                    res.status(500).send('Something went wrong');
                })
            })
            .catch((error) => {
                console.log('Failed fetching friend ids, ' + error);
                res.status(500).send('Something went wrong');
            })
        })
        .catch((error) => {
            console.log('Error decoding token, ' + error);
            res.status(500).send('Invalid token');
        })
    }
}