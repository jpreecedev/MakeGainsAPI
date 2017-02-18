import { Router, Response, Request } from 'express';
import { getServiceUrl } from '../shared';
import User from '../models/user/user.controller';
import { IUser } from '../models/user/user.model';

import * as config from '../config';

const Fitbit = require('fitbit-node');
const client = new Fitbit(config.fitbit_oauth_clientid, config.fitbit_client_secret);
const callbackUrl = '/api/fitbit/callback';

const fitbitRouter: Router = Router();

const yesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().substring(0, 10);
};

fitbitRouter.get('/', (request: Request, response: Response) => {

    let scope = 'activity heartrate location nutrition profile settings sleep social weight';
    response.redirect(client.getAuthorizeUrl(scope, getServiceUrl(request) + callbackUrl));

});

fitbitRouter.get('/callback', (request: Request, response: Response) => {
    client.getAccessToken(request.query.code, getServiceUrl(request) + callbackUrl).then((result) => {
        client.get('/profile.json', result.access_token).then((results) => {
            User.addOrUpdate({ access_token: result.access_token, user: results[0].user }, request, response, () => {
                response.redirect('stats/' + results[0].user.encodedId);
            });
        });
    }).catch((error) => {
        response.send(error);
    });
});

fitbitRouter.get('/stats/:encodedId', (request: Request, response: Response) => {

    User.get(request, response, (err, user: IUser) => {

        client.get(`/activities/date/${yesterday()}.json`, user[0].access_token).then((results) => {
            response.send(results[0]);
        }).catch((error) => {
            response.send(error);
        });

    });

});

fitbitRouter.get('/fat/:encodedId', (request: Request, response: Response) => {

    User.get(request, response, (err, user: IUser) => {

        client.get(`/body/log/fat/date/2017-02-01/${yesterday()}.json`, user[0].access_token).then((results) => {
            response.send(results[0]);
        }).catch((error) => {
            response.send(error);
        });

    });
});

export { fitbitRouter }
