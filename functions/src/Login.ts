import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Callable } from './Callable';
import { USERS_COLLECTION } from './constants';
import * as bcrypt from 'bcrypt';

export class LoginHandler extends Callable {

    constructor(client: typeof admin) {
        super(client);
    }

    run(req: functions.https.Request, res: functions.Response) {
        const id: string = req.body.id;
        const password: string = req.body.password;

        if (id == null || password == null) {
            res.status(400).send('Invalid request');
            return;
        }

        const db: admin.firestore.Firestore = admin.firestore();
        db.collection(USERS_COLLECTION).doc(id).get()
        .then((result) => {
            const userDocPassword = result.get('password');
            const firstName = result.get('firstName');
            const lastName = result.get('lastName');
            const developerMetadata = result.get('developerMetadata');
    
            if (!bcrypt.compareSync(password, userDocPassword)) {
                res.status(401).send('Invalid password');
                return;
            }
    
            const user = {
                id,
                firstName,
                lastName,
                developerMetadata
            };
    
            admin.auth().createCustomToken(id)
            .then(function(customToken) {
                const response = {
                    token: customToken,
                    user: user,
                };
                res.send(response);
            })
            .catch((error) => {
                console.log('Error creating custom token: ', error);
                res.status(500).send('Something went wrong');
            });
        })
        .catch((error) => {
            console.log('Error fetching user: ', error);
            res.status(400).send('Invalid username');
        });
    }
}