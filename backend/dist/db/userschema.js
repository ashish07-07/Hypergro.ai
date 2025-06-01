"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Property' }],
    recommendedToMe: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Property' }],
    recommendedByMe: [
        {
            propertyId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Property' },
            toUserId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
        }
    ]
}, { timestamps: true });
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
