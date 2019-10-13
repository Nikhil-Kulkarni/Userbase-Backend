import { USERS_COLLECTION, FRIENDS_COLLECTION } from './constants';
import { admin } from './admin';

export const getFriends = (req, res) => {
    const token = req.body.token;
    admin.auth().verifyIdToken(token)
    .then(function(decodedToken) {
        const id = decodedToken.uid;
        const db = admin.firestore();
        db.collection(USERS_COLLECTION).doc(uid)
    })
    .catch(function(error) {
        console.log('Error getting token ', error);
        res.status(500).send('Something went wrong');
    });
};
