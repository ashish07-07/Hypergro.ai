"use strict";
// import express from 'express'
// import authmiddleware from '../middleware/authmiddleware'
// import User from '../db/userschema'
// import mongoose from 'mongoose'
// const router=express.Router()
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.use(express.json())
// interface recommnedproperty{
//     email:string,
//     propertyid:string
// }
// router.post('/property',authmiddleware,async function(req:any,res:any)
// {
//         try 
//         {
//                 const body:recommnedproperty=req.body;
//                 if(!body)
//                 {
//                        console.log("No data found")
//                        return res.status(400).json(
//                         {
//                             message:"NO Proper data revieved for recommendation here"
//                         }
//                        )
//                 }
//                 const recommendinguserid=req.user.id;
//                 if (!recommendinguserid)
//                 {
//                      console.log("no user recommendind id was found")
//                      return res.status(400).json(
//                         {
//                             message:"not authenticated user found heree"
//                         }
//                      )
//                 }
//                 const recipient:any=await User.findOne({email:body.email})
//                 if (!recipient)
//                 {
//                      console.log("the rcipient is not found for this particular id")
//                       return res.status(404).json({ message: "reciepient user not found" });
//                 }
//                  const propertyObjectId = new mongoose.Types.ObjectId(body.propertyid);
//                 if (!recipient.recommendedToMe.includes(propertyObjectId))
//                 {
//                      recipient.recommendedToMe.push(propertyObjectId)
//                      await recipient.save()
//                 } 
//                 const sender= await User.findById(req.user.id)
//                 const alreadyRecommended=sender?.recommendedByMe.some(function(entry)
//             {
//                  return entry.propertyId.toString()===body.propertyid && entry.toUserId===recipient._id?.toString()
//             })
//             if (!alreadyRecommended)
//             {
//                  sender?.recommendedByMe.push({
//                     propertyId:propertyObjectId,
//                     toUserId:recipient._id
//                  })
//                  await sender?.save()
//             }
//             res.status(200).json({ message: "Property recommended successfully." });
//         }
//         catch (rror)
//         {
//              console.error("Error recommending property:", err);
//     res.status(500).json({ message: "Internal server error" });
//         }
// })
// export default router
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = __importDefault(require("../middleware/authmiddleware"));
const userschema_1 = __importDefault(require("../db/userschema"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/property', authmiddleware_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (!body) {
                return res.status(400).json({
                    message: 'No proper data received for recommendation.',
                });
            }
            const recommendingUserId = req.user.id;
            if (!recommendingUserId) {
                return res.status(400).json({
                    message: 'No authenticated user  recommending userid found.',
                });
            }
            const recipient = yield userschema_1.default.findOne({ email: body.email });
            if (!recipient) {
                return res.status(404).json({ message: 'Recipient user not found.' });
            }
            const propertyObjectId = new mongoose_1.default.Types.ObjectId(body.propertyid);
            // Check if already recommended to recipient
            const alreadyInRecipient = recipient.recommendedToMe.some(function (id) {
                return id.toString() === propertyObjectId.toString();
            });
            if (!alreadyInRecipient) {
                recipient.recommendedToMe.push(propertyObjectId);
                yield recipient.save();
            }
            // Add to sender's recommendedByMe
            const sender = yield userschema_1.default.findById(recommendingUserId);
            const alreadyRecommended = sender === null || sender === void 0 ? void 0 : sender.recommendedByMe.some(function (entry) {
                return (entry.propertyId.toString() === body.propertyid &&
                    entry.toUserId.toString() === recipient._id.toString());
            });
            if (!alreadyRecommended) {
                sender === null || sender === void 0 ? void 0 : sender.recommendedByMe.push({
                    propertyId: propertyObjectId,
                    toUserId: recipient._id,
                });
                yield (sender === null || sender === void 0 ? void 0 : sender.save());
            }
            res.status(200).json({ message: 'Property recommended successfully.' });
        }
        catch (err) {
            console.error('Error recommending property:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
});
exports.default = router;
