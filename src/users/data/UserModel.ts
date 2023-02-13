import { Schema, Document, model, Model } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

interface UserParams {
    name: string;
    email: string;
}
export interface UserDto extends UserParams {
    id: string;
}

export interface UserModel extends Model<UserDocument> {}
export interface UserDocument extends Document {
    name: string;
    email: string;
}

export const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);
UserSchema.plugin(mongooseLeanVirtuals);

export const User = model<UserDocument, UserModel>('User', UserSchema);