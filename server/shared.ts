import { Request } from 'express';

export function getServiceUrl(request: Request) {
    return request.protocol + '://' + request.get('host');
}

export interface FitbitResponse {
    access_token: String;
    user: FitbitProfile;
}

export interface FitbitProfile {
    encodedId: String;
}
