import mongoose = require('mongoose');

export interface IUser extends mongoose.Document {
    access_token: String;
}

const UserSchema = new mongoose.Schema({
    access_token: String
});

export default mongoose.model<IUser>('User', UserSchema);
