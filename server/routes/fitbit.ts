import { Router, Response, Request } from 'express';
import { getServiceUrl } from '../shared';

let Fitbit = require('fitbit-node');
import { fitbit_oauth_clientid, fitbit_client_secret } from '../config';

interface FitbitRequest extends Request {
    session: any;
}

const fitbitRouter: Router = Router();
const client = new Fitbit(fitbit_oauth_clientid, fitbit_client_secret);

const callbackUrl = '/api/fitbit/callback';

let activitiesUrl = '/activities/date/{0}.json'; //yyyy-MM-dd
let bodyFatUrl = '/body/log/fat/date/{0}.json'; //yyyy-MM-dd

fitbitRouter.get('/', function(request: Request, response: Response) {

  let scope = 'activity heartrate location nutrition profile settings sleep social weight';
  response.redirect(client.getAuthorizeUrl(scope, getServiceUrl(request) + callbackUrl));

});

fitbitRouter.get('/callback', function (request: Request, response: Response) {
    client.getAccessToken(request.query.code, getServiceUrl(request) + callbackUrl).then(function (result) {
        client.get('/profile.json', result.access_token).then(function (results) {
             response.send({ token: result.access_token, result: results[0] });
        });
    }).catch(function (error) {
        response.send(error);
    });
});

fitbitRouter.get('/stats', function (request: Request, response: Response) {
    client.get('/activities/date/2017-02-10.json', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1REROUFIiLCJhdWQiOiIyMjg0TFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNDg2OTM4NzAxLCJpYXQiOjE0ODY5MDk5MDF9.-zdja1E22bCjahkAaT0sL9LDNb3tOlq9lOTe86qgpJA').then(function (results) {
        response.send(results[0]);
    }).catch(function (error) {
        response.send(error);
    });
});

fitbitRouter.get('/fat', function (request: Request, response: Response) {
    client.get('/body/log/fat/date/2017-01-15/2017-02-10.json', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1REROUFIiLCJhdWQiOiIyMjg0TFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNDg2OTM4NzAxLCJpYXQiOjE0ODY5MDk5MDF9.-zdja1E22bCjahkAaT0sL9LDNb3tOlq9lOTe86qgpJA').then(function (results) {
        response.send(results[0]);
    }).catch(function (error) {
        response.send(error);
    });
});

export { fitbitRouter }
