import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { LoginHandler } from './Login';
import { LogoutHandler } from './Logout';
import { RegisterHandler } from './Register';
import { FetchFriendsHandler } from './FetchFriends';
import { SendFriendRequestHandler } from './SendFriendRequest';
import { AcceptFriendRequestHandler } from './AcceptFriendRequest';
import { GetFriendRequestsHandler } from './GetFriendRequests';
import { SearchUsersHandler } from './SearchUsers';

admin.initializeApp();

const loginHandler = new LoginHandler();
const logoutHandler = new LogoutHandler();
const registerHandler = new RegisterHandler();
const fetchFriendsHandler = new FetchFriendsHandler();
const sendFriendRequestHandler = new SendFriendRequestHandler();
const acceptFriendRequestHandler = new AcceptFriendRequestHandler();
const getFriendRequestsHandler = new GetFriendRequestsHandler();
const searchUsersHandler = new SearchUsersHandler();

export const loginUser = functions.https.onRequest(loginHandler.run);
export const logout = functions.https.onRequest(logoutHandler.run);
export const registerUser = functions.https.onRequest(registerHandler.run);
export const fetchFriends = functions.https.onRequest(fetchFriendsHandler.run);
export const sendFriendRequest = functions.https.onRequest(sendFriendRequestHandler.run);
export const acceptFriendRequest = functions.https.onRequest(acceptFriendRequestHandler.run);
export const getFriendRequests = functions.https.onRequest(getFriendRequestsHandler.run);
export const searchUsers = functions.https.onRequest(searchUsersHandler.run);