import { Router, Response, Request } from 'express';
import { getServiceUrl, FitbitResponse, FitbitFat, FitbitStats, FitbitActivitiesCalories, FitbitFoodSummary } from '../shared';
import User from '../models/user/user.controller';
import { IUser } from '../models/user/user.model';

import * as config from '../config';

const FitbitNodeClient = require('fitbit-node');
const client = new FitbitNodeClient(config.fitbit_oauth_clientid, config.fitbit_client_secret);

const router: Router = Router();

router.get('/', (request: Request, response: Response) => {
    let scope = 'activity heartrate location nutrition profile settings sleep social weight';
    response.redirect(client.getAuthorizeUrl(scope, `${getServiceUrl(request)}/api/fitbit/callback`));
});

router.get('/callback', (request: Request, response: Response) => {
    client.getAccessToken(request.query.code, `${getServiceUrl(request)}/api/fitbit/callback`)
        .then((result: FitbitResponse) => {
            client.get('/profile.json', result.access_token)
                .then((fitbitResponse: FitbitResponse[]) => {

                    fitbitResponse[0].access_token = result.access_token;
                    User.addOrUpdate(fitbitResponse[0], () => {
                        response.redirect('stats/' + fitbitResponse[0].user.encodedId);
                    });
                });
        })
        .catch((error) => {
            response.send(error);
        });
});

router.get('/calories/:encodedId/:from/:to', (request: Request, response: Response) => {

    User.getByEncodedId(request.params.encodedId, (err, user: IUser) => {
        client.get(`/activities/calories/date/${request.params.from}/${request.params.to}.json`, user.access_token)
            .then((result) => {
                let data: FitbitActivitiesCalories[] = result[0]['activities-calories'];
                response.send(data);
            })
            .catch((error) => {
                response.send(error);
            });
    });
});

router.get('/food/:encodedId/:date', (request: Request, response: Response) => {

    User.getByEncodedId(request.params.encodedId, (err, user: IUser) => {
        client.get(`/foods/log/date/${request.params.date}.json`, user.access_token)
            .then((result) => {
                let data: FitbitFoodSummary = result[0].summary;
                response.send(data);
            })
            .catch((error) => {
                response.send(error);
            });
    });
});

router.get('/stats/:encodedId/:date', (request: Request, response: Response) => {

    User.getByEncodedId(request.params.encodedId, (err, user: IUser) => {
        client.get(`/activities/date/${request.params.date}.json`, user.access_token)
            .then((result) => {
                let data: FitbitStats = result[0];
                response.send(data);
            })
            .catch((error) => {
                response.send(error);
            });
    });
});

router.get('/fat/:encodedId/:from/:to', (request: Request, response: Response) => {

    User.getByEncodedId(request.params.encodedId, (err, user: IUser) => {
        client.get(`/body/log/fat/date/${request.params.from}/${request.params.to}.json`, user.access_token)
            .then((result) => {
                let data: FitbitFat[] = result[0].fat;
                response.send(data);
            })
            .catch((error) => {
                response.send(error);
            });
    });
});

export { router as fitbitRouter }
