"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileuploadroute_1 = __importDefault(require("./routes/fileuploadroute"));
const userlogin_1 = __importDefault(require("./routes/userlogin"));
const userregistration_1 = __importDefault(require("./routes/userregistration"));
const updateproperty_1 = __importDefault(require("./routes/updateproperty"));
const addproperty_1 = __importDefault(require("./routes/addproperty"));
const deleteproperty_1 = __importDefault(require("./routes/deleteproperty"));
const addorremovefavorites_1 = __importDefault(require("./routes/addorremovefavorites"));
const recommendpropertytouser_1 = __importDefault(require("./routes/recommendpropertytouser"));
const searchpropertyies_1 = __importDefault(require("./routes/searchpropertyies"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/upload', fileuploadroute_1.default);
app.use('/userreg', userregistration_1.default);
app.use('/userlog', userlogin_1.default);
app.use('/update', updateproperty_1.default);
app.use('/addproperty', addproperty_1.default);
app.use('/delate', deleteproperty_1.default);
app.use('/add', addorremovefavorites_1.default);
app.use('/recommend', recommendpropertytouser_1.default);
app.use('/search', searchpropertyies_1.default);
app.listen(3000, function () {
    console.log(`server listening on port3000`);
});
