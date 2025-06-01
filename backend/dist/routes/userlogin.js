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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userschema_1 = __importDefault(require("../db/userschema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (!body.email || !body.password) {
                return res.status(400).json({
                    message: "Please prove all the field data"
                });
            }
            const user = yield userschema_1.default.findOne({
                email: body.email
            });
            if (!user) {
                console.log('no user found with this email id re baba');
                return res.status(400).json({
                    message: 'you need to register before logging in baba'
                });
            }
            const hashedpassword = yield bcrypt_1.default.compare(body.password, user.password);
            if (!hashedpassword) {
                return res.status(401).json({
                    message: "Password was incorrect baba please give correct password"
                });
            }
            const payload = {
                email: body.email,
                id: user._id,
            };
            const secret = process.env.JWTSECRET;
            console.log(`the env is ${process.env.JWTSECRET}`);
            if (!secret) {
                console.log("I did not found jwt token in enf file bro");
                return res.status(500).json({ message: "Server error: JWT secret missing" });
            }
            const token = yield jsonwebtoken_1.default.sign(payload, secret);
            return res.status(201).json({
                message: "Login successful",
                jwt: token
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
