import mongoose from "mongoose";
import { Schema,Document } from "mongoose";

mongoose.connect('mongodb+srv://bkashishh07:qlTA5MWaJ14vhTaM@cluster0.r7cjtrd.mongodb.net/').then(function ()
{
      console.log('data base is connected baba ')
}).catch(function (err)
{   
    console.log('could not connect to the databse',err)

})

export interface IProperty extends Document {
  id: string;
  title: string;
  type: string;
  price: number;
  state: string;
  city: string;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];         
  furnished: string;
  availableFrom: Date;
  listedBy: string;
  tags: string[];          
  colorTheme: string;
  rating: number;
  isVerified: boolean;
  listingType: string;
  createdBy: mongoose.Types.ObjectId; 
  
}
const PropertySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  areaSqFt: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  amenities: [{ type: String }],
  furnished: { type: String },
  availableFrom: { type: Date },
  listedBy: { type: String },
  tags: [{ type: String }],
  colorTheme: { type: String },
  rating: { type: Number },
  isVerified: { type: Boolean },
  listingType: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

 let Property=mongoose.model<IProperty>('Property',PropertySchema)
export default Property
