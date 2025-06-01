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
const router = express_1.default.Router();
router.use(express_1.default.json());
const authmiddleware_1 = __importDefault(require("../middleware/authmiddleware"));
const schema_1 = __importDefault(require("../db/schema"));
router.post('/details', authmiddleware_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (!body) {
                console.log("give proper propery fileds");
                return res.status(400).json({
                    message: "Give all the valid propert details and dont miss anything as every details is necessary"
                });
            }
            const propertyadded = yield schema_1.default.create({
                id: body.id,
                title: body.title,
                type: body.type,
                price: body.price,
                state: body.state,
                city: body.city,
                areaSqFt: body.areaSqFt,
                bedrooms: body.bedrooms,
                bathrooms: body.bathrooms,
                amenities: body.amenities,
                furnished: body.furnished,
                listedBy: body.listedBy,
                tags: body.tags,
                colorTheme: body.colorTheme,
                rating: body.rating,
                isVerified: body.isVerified,
                listingType: body.listingType,
                createdBy: req.user.id,
                availableFrom: body.availableFrom
            });
            if (!propertyadded) {
                console.log("errror while adding property to ");
                return res.status(400).json({
                    message: "Error while adding the property by user.Pls make sure include all propertydetails"
                });
            }
            console.log("nice you have added the data to the datbase");
            return res.status(201).json({
                message: "Data added sucdesfully to the data base",
                data: propertyadded
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({
                message: e
            });
        }
    });
});
exports.default = router;
