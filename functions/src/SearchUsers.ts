import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Callable } from './Callable';

export class SearchUsersHandler extends Callable {

    constructor(client: typeof admin) {
        super(client)
    }
    
    run(req: functions.https.Request, res: functions.Response) {
        // TODO
    }
}