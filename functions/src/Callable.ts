import * as functions from 'firebase-functions';

/**
 * Implement to add a new cloud function
 */
export abstract class Callable {

    /**
     * Runs a serverless function
     * @param req The request of the function
     * @param res Response object
     */
    abstract run(req: functions.https.Request, res: functions.Response): void;

}