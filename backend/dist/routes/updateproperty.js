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
const schema_1 = __importDefault(require("../db/schema"));
const router = express_1.default.Router();
router.put('/property/:id', authmiddleware_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const propertyid = req.params.id;
            const updates = req.body;
            if (!propertyid) {
                console.log("no property id is sent in params");
                return res.status(400).json({
                    message: "No Property has been sent. pLese send the properyid next time for updates"
                });
            }
            const property = yield schema_1.default.findById(propertyid);
            if (!property) {
                console.log("NO propert found in datbase with this particualar id baba");
                return res.status(404).json({
                    message: "No property found in databse with this particualr id"
                });
            }
            if (property.createdBy.toString() !== req.user.id) {
                console.log("you are not allowed to update the property becasue you did not create it bro");
                return res.status(403).json({
                    message: "You are not the one who created this property details so you are not allowed to update it "
                });
            }
            const updatedproperty = yield schema_1.default.findByIdAndUpdate(propertyid, { $set: updates }, { new: true, runValidators: true });
            if (!updatedproperty) {
                console.log("update has no been done in dtabse");
                res.status(400).json({
                    message: "Not updated in database"
                });
            }
            console.log("updated the property succesfully bro");
            res.status(200).json({
                message: "Updated suceessfully in database bro",
                propertydetails: updatedproperty
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({
                message: "NOt updated in data base"
            });
        }
    });
});
exports.default = router;
