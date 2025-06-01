"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.connect('mongodb+srv://bkashishh07:qlTA5MWaJ14vhTaM@cluster0.r7cjtrd.mongodb.net/').then(function () {
    console.log('data base is connected baba ');
}).catch(function (err) {
    console.log('could not connect to the databse', err);
});
const PropertySchema = new mongoose_2.Schema({
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
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
});
let Property = mongoose_1.default.model('Property', PropertySchema);
exports.default = Property;
