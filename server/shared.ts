import { Request } from 'express';

export function getServiceUrl(request: Request) {
    return request.protocol + '://' + request.get('host');
}
