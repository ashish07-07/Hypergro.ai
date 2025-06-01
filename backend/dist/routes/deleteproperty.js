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
router.use(express_1.default.json());
router.delete('/property/:id', authmiddleware_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("inside the delete route ");
            const propertyid = req.params.id;
            if (!propertyid) {
                console.log("no propert id is sent in the params");
                return res.status(400).json({
                    message: "No propertyid is sent in params"
                });
            }
            const property = yield schema_1.default.findById(propertyid);
            if (!property) {
                console.log("the id sent is not a valid property id .Please send proper valid id");
                return res.status(400).json({
                    messag: "Send correct propertyid"
                });
            }
            console.log(`the property created is is ${property.createdBy} re baba and thr user who created id is ${req.user.id}`);
            if (property.createdBy.toString() !== req.user.id) {
                console.log("you cannot delete the property because you have not created it ");
                return res.status(400).json({
                    message: "cannot deelte becasue u did not create it "
                });
            }
            const deletedproperty = yield schema_1.default.findByIdAndDelete(propertyid);
            if (!deletedproperty) {
                console.log("i did not find any id they was for property so was not able to delete it ");
                return res.status(400).json({
                    message: "was not bale to delete the property becsue the property id does not exist "
                });
            }
            console.log("sucdessfully delated teh propert with id of", propertyid);
            return res.status(201).json({
                message: "deleted the propert for this particualr id"
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({
                message: "was not bale to delete the property. "
            });
        }
    });
});
exports.default = router;
