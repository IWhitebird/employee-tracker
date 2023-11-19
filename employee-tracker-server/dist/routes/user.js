"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
//GET ALL USERS
router.get("/", user_1.getUsers);
//CREATE USER
router.post("/", user_1.createUser);
//GET USER BY ID
router.get("/:id", user_1.getUserById);
//UPDATE EXISTING USER
router.put("/:id", user_1.updateUser);
//DELETE USER BY ID
router.delete("/:id", user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map