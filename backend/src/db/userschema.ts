
import mongoose from "mongoose";
import { Schema,Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  favorites: mongoose.Types.ObjectId[];         
  recommendedToMe: mongoose.Types.ObjectId[];    
  recommendedByMe: {
    propertyId: mongoose.Types.ObjectId;
    toUserId: mongoose.Types.ObjectId;
  }[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  recommendedToMe: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  recommendedByMe: [
    {
      propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
      toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ]
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);

export default User