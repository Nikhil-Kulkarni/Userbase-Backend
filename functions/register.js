import { USERS_COLLECTION } from './constants';
import { admin } from './admin';
const bcrypt = require('bcrypt');

export const registerUser = (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const developerMetadata = req.body.developerMetadata;

    if (id == null || password == null || firstName == null || lastName == null) {
        res.status(400).send('Invalid request');
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
        id: id,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        developerMetadata: developerMetadata,
    };

    admin.auth().createCustomToken(id)
    .then(function(customToken) {
        const db = admin.firestore();
        db.collection(USERS_COLLECTION).doc(id).set(user)
        .then(function(result) {
            const response = {
                token: customToken,
                user: user,
            };
            res.send(response);
        })
        .catch(function(error) {
            console.log('Error saving user to db: ', error);
            res.status(500).send('Something went wrong');
        });
    })
    .catch(function(error) {
        console.log('Error creating custom token: ', error);
        res.status(500).send('Something went wrong');
    })
};