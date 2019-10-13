import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * Implement to add a new cloud function
 */
export abstract class Callable {

    client: typeof admin;
    
    constructor(client: typeof admin) {
        this.client = client;
    }

    /**
     * Runs a serverless function
     * @param req The request of the function
     * @param res Response object
     */
    abstract run(req: functions.https.Request, res: functions.Response): void;

}