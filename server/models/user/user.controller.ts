import { Request, Response } from 'express';
import User, { IUser } from './user.model';

const get = (request: Request, response: Response, next: Function) => {
    User.find({ encoded_id: request.params.encodedId }, (err, users: IUser[]) => {
        if (err) {
            return next(err);
        }
        return next(err, users);
    });
};

const addOrUpdate = (fitbitUser: any, request: Request, response: Response, next: Function) => {

    User.find({ encoded_id: fitbitUser.user.encodedId }, (err, result) => {
        if (err) {
            return next(err);
        }

        if (!result || !result.length) {
            let user = User({
                access_token: fitbitUser.access_token,
                encoded_id: fitbitUser.user.encodedId
            });
            user.save(() => {
                return next();
            });
        } else {
            return next(result[0]);
        }
    });
};

export default { get, addOrUpdate };
