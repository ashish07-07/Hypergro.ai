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
const multer = require("multer");
const schema_1 = __importDefault(require("../db/schema"));
router.use(express_1.default.json());
const upload = multer({ dest: 'uploads' });
const fs = require('fs');
const csvParser = require("csv-parser");
const authmiddleware_1 = __importDefault(require("../middleware/authmiddleware"));
router.post('/csvfile', authmiddleware_1.default, upload.single('csvFile'), function (req, res) {
    try {
        console.log(`i got the field here that is ${req}`);
        if (!req.file) {
            return res.status(400).json({
                message: "No file was found "
            });
        }
        const result = [];
        fs.createReadStream(req.file.path).pipe(csvParser())
            .on('data', function (data) {
            let newdata = {};
            let ameni = data.amenities;
            let splittedemmi = ameni.split("|");
            let tagbit = data.tags;
            let splittedtags = tagbit.split("|");
            newdata = Object.assign(Object.assign({}, data), { price: Number(data.price), areaSqFt: Number(data.areaSqFt), bedrooms: Number(data.bedrooms), bathrooms: Number(data.bathrooms), availableFrom: new Date(data.availableFrom), amenities: splittedemmi, tags: splittedtags, rating: Number(data.rating), isVerified: data.isVerified.toLowerCase() === "true", createdBy: req.user.id });
            console.log(newdata);
            result.push(newdata);
        })
            .on('end', function () {
            return __awaiter(this, void 0, void 0, function* () {
                fs.unlink(req.file.path, function (error) {
                    if (error) {
                        console.error('Error deleting file:', error);
                    }
                });
                yield schema_1.default.insertMany(result);
                res.status(201).json({
                    message: "CSV Uploaded and inserted succesfully to databse baba",
                    propertydata: result
                });
            });
        }).on('error', function (eror) {
            console.error('Error parsing');
            res.status(500).send("Error parsing csv");
        });
    }
    catch (e) {
        console.error("something went wrong", e);
        return res.status(500).json({
            message: e
        });
    }
});
exports.default = router;
// id,title,type(bunglow,villa,apartment) ,price,state,city,areasqft,bedrerooms,bathrooms,amenities,furnished,availalbe,listedby,tags,colorthem,rating,isverified,listingtype
