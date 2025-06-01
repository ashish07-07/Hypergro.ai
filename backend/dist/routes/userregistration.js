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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userschema_1 = __importDefault(require("../db/userschema"));
router.post('/register', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (!body.email || !body.password || !body.name) {
                console.log("got irrevelent details");
                return res.status(400).json({
                    message: "Give valid data for registration"
                });
            }
            const userfound = yield userschema_1.default.findOne({
                email: body.email
            });
            if (userfound) {
                return res.status(400).json({
                    message: "Email already exist/user already exist please login"
                });
            }
            const hashedpassword = yield bcrypt_1.default.hash(body.password, 10);
            const usercreated = yield userschema_1.default.create({
                name: body.name,
                email: body.email,
                password: hashedpassword
            });
            yield usercreated.save();
            return res.status(201).json({
                message: "user created sucessfully",
                userdetail: {
                    id: usercreated._id,
                    name: usercreated.name,
                    email: usercreated.email
                }
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
