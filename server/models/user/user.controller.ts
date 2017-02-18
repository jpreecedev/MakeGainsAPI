import { Request, Response } from 'express';
import User, { IUser } from './user.model';
import { FitbitResponse } from '../../shared';

const add = (accessToken: String, encodedUserId: String, next: Function) => {
    let user = User({
        access_token: accessToken,
        encoded_id: encodedUserId
    });
    user.save((err) => {
        return next(err);
    });
};

const update = (user: IUser, accessToken: String, next: Function) => {
    user.access_token = accessToken;
    user.save((err) => {
        return next(err);
    });
};

const get = (query: {}, next: Function) => {
    User.find(query, (err, result: IUser[]) => {
        if (err) {
            return next(err);
        }
        return next(err, result);
    });
}

const getByEncodedId = (encodedId: String, next: Function) => {

    let query = { encoded_id: encodedId };

    get(query, (err, result: IUser[]) => {
        if (err) {
            return next(err);
        }
        return next(null, result[0]);
    });
};

const addOrUpdate = (fitbitResponse: FitbitResponse, next: Function) => {

    let query = { encoded_id: fitbitResponse.user.encodedId };

    get(query, (err, result: IUser[]) => {
        if (err) {
            return next(err);
        }

        if (result && result.length) {
            update(result[0], fitbitResponse.access_token, next);
        } else {
            add(fitbitResponse.access_token, fitbitResponse.user.encodedId, next);
        }
    });
};

export default { getByEncodedId, addOrUpdate };
