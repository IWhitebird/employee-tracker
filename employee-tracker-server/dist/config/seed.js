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
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const userJsonData_1 = require("./userJsonData");
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.deleteMany();
        yield User_1.default.insertMany(userJsonData_1.usersData);
        console.log('Database seeded successfully');
    }
    catch (error) {
        console.error('Error seeding database:', error.message);
    }
    finally {
        mongoose_1.default.disconnect();
    }
});
exports.default = seedDatabase;
//# sourceMappingURL=seed.js.map