import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Callable } from './Callable';
import { USERS_COLLECTION } from './constants';
import * as bcrypt from 'bcrypt';

export class RegisterHandler extends Callable {

    run(req: functions.https.Request, res: functions.Response) {
        const id: string = req.body.id;
        const password: string = req.body.password;
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;
        const developerMetadata: string = req.body.developerMetadata;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
    
        const user = {
            id,
            password: hashedPassword,
            firstName,
            lastName,
            developerMetadata,
        };
    
        admin.auth().createCustomToken(id)
        .then((customToken) => {
            const db = admin.firestore();
            db.collection(USERS_COLLECTION).doc(id).set(user)
            .then((result) => {
                const response = {
                    token: customToken,
                    user: user,
                };
                res.send(response);
            })
            .catch((error) => {
                console.log('Error saving user to db: ', error);
                res.status(500).send('Something went wrong');
            });
        })
        .catch((error) => {
            console.log('Error creating custom token: ', error);
            res.status(500).send('Something went wrong');
        })
    }

}