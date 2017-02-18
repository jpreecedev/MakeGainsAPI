import mongoose = require('mongoose');

export interface IUser extends mongoose.Document {
    access_token: String;
    encoded_id: String;
    save: Function;
}

const UserSchema = new mongoose.Schema({
    access_token: String,
    encoded_id: String
});

export default mongoose.model<IUser>('User', UserSchema);
