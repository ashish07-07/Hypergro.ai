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
exports.authmiddleware = authmiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authmiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authoheader = req.headers.authorization;
            if (!authoheader) {
                console.log("no header found here");
                return res.status(400).json({
                    message: "No authorization header found here "
                });
            }
            const token = authoheader.split(" ")[1];
            if (!token) {
                console.log("No token found please enter your token from next time");
                return res.status(401).json({
                    message: "No token found.Please send token before"
                });
            }
            const secret = process.env.JWTSECRET;
            if (!secret) {
                console.log("NO secret env found here");
                return res.status(400).json({
                    message: "NO ENV  found baba"
                });
            }
            const decodedtoken = yield jsonwebtoken_1.default.verify(token, secret);
            if (!decodedtoken) {
                console.log("please give correct token");
                return res.status(400).json({
                    message: "Error the token in not correct "
                });
            }
            req.user = decodedtoken;
            console.log("ok now everything went well here in the auth middleware passing to other part of request now ");
            next();
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({
                message: e
            });
        }
    });
}
exports.default = authmiddleware;
