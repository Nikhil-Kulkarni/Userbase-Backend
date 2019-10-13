import { USERS_COLLECTION } from './constants';
import { admin } from './admin';
const bcrypt = require('bcrypt');

export const loginUser = (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    if (id == null || password == null) {
        res.status(400).send('Invalid request');
        return;
    }

    const db = admin.firestore();
    db.collection(USERS_COLLECTION).doc(id).get()
    .then(function(result) {
        const userDocPassword = result.get('password');
        const firstName = result.get('firstName');
        const lastName = result.get('lastName');
        const developerMetadata = result.get('developerMetadata');

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if (!bcrypt.compareSync(userDocPassword, hashedPassword)) {
            res.status(401).send('Invalid password');
            return;
        }

        const user = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            developerMetadata, developerMetadata
        };

        admin.auth().createCustomToken(id)
        .then(function(customToken) {
            const response = {
                token: customToken,
                user: user,
            };
            res.send(response);
        })
        .catch(function(error) {
            console.log('Error creating custom token: ', error);
            res.status(500).send('Something went wrong');
        });
    })
    .catch(function(error) {
        console.log('Error fetching user: ', error);
        res.status(400).send('Invalid username');
    });
};