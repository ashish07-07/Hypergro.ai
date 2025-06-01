"use strict";
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
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = __importDefault(require("../middleware/authmiddleware"));
const userschema_1 = __importDefault(require("../db/userschema"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/favorites/:id', authmiddleware_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const propertyid = req.params.id;
            if (!propertyid) {
                console.log("No property id found ");
                return res.status(400).json({
                    message: "No propert id has been sent in params"
                });
            }
            const userid = req.user.id;
            if (!userid) {
                console.log("no user id found ");
                return res.status(400).json({
                    message: "No user id found"
                });
            }
            const user = yield userschema_1.default.findById(userid);
            if (!user) {
                console.log("no user found with this particualr id");
                return res.status(400).json({
                    message: "No user found with particualr id"
                });
            }
            const alreadyfavourite = user.favorites.includes(propertyid);
            if (alreadyfavourite) {
                user.favorites = user.favorites.filter(function (val) {
                    return val.toString() !== propertyid;
                });
                yield user.save();
                return res.status(200).json({ message: 'Removed from favorites' });
            }
            else {
                user.favorites.push(propertyid);
                yield user.save();
                return res.status(200).json({ message: 'Added to favorites' });
            }
        }
        catch (e) {
            console.error('Error toggling favorite:', e);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
});
exports.default = router;
