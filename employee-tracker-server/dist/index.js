"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const user_1 = __importDefault(require("./routes/user"));
const team_1 = __importDefault(require("./routes/team"));
//To Connect to MongoDB Database
(0, database_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
//Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
//Routes
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/team", team_1.default);
app.get("/", (res) => {
    return res.json({
        success: true,
        message: "Your Server is now running",
    });
});
//To Start the Server
app.listen(PORT, () => { console.log(`Server is running at ${PORT}`); });
//To Seed the Database
// import seedDatabase from "./config/seed";
// seedDatabase();
//# sourceMappingURL=index.js.map