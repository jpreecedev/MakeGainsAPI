import { Request, Response } from 'express';
import User, { IUser } from './user.model';

const get = (request: Request, response: Response, next: Function) => {
    console.log("fuck off 2");

let newUser = User({
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  admin: true
});

newUser.save((err) => {
    User.find({}, (err, users: IUser[]) => {
        if (err) {
            return next(err);
        }
        return next(err, users);
    });
});
    console.log("fuck off");
};

export default { get };
