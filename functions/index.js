const functions = require('firebase-functions');
import { registerUser } from './register';
import { loginUser } from './login';
import { getFriends }  from './getFriends';
import { sendFriendRequest } from './sendFriendRequest';
import { acceptFriendRequest } from './acceptFriendRequest';
import { getFriendRequests } from './getFriendRequests';
import { search } from './search';

exports.registerUser = functions.https.onRequest(registerUser);
exports.loginUser = functions.https.onRequest(loginUser);
exports.getFriends = functions.https.onRequest(getFriends);
exports.sendFriendRequest = functions.https.onRequest(sendFriendRequest);
exports.acceptFriendRequest = functions.https.onRequest(acceptFriendRequest);
exports.getFriendRequests = functions.https.onRequest(getFriendRequests);
exports.search = functions.https.onRequest(search);
