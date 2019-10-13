import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { LoginHandler } from './Login';
import { RegisterHandler } from './Register';

admin.initializeApp();

const loginHandler = new LoginHandler(admin);
const registerHandler = new RegisterHandler(admin);

export const loginUser = functions.https.onRequest(loginHandler.run);
export const registerUser = functions.https.onRequest(registerHandler.run);