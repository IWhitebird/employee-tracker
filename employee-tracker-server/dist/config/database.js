"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MongoConnect = () => {
    mongoose_1.default
        .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("MongoDB Connected"))
        .catch((error) => {
        console.log("Error in DB connection");
        console.error(error);
        process.exit(1);
    });
};
exports.default = MongoConnect;
//# sourceMappingURL=database.js.map