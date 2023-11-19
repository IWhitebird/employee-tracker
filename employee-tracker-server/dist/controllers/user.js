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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 20, search = "", gender, domain, available, } = req.query;
        const perPage = parseInt(limit);
        const currentPage = parseInt(page);
        const searchQuery = {};
        if (search) {
            const regex = new RegExp(search.toString(), 'i');
            searchQuery.$or = [
                { first_name: regex },
                { last_name: regex },
                { email: regex },
            ];
        }
        if (gender && gender !== "all") {
            if (gender == 'other') {
                searchQuery.gender = { $nin: ['Male', 'Female'] };
            }
            else
                searchQuery.gender = gender;
        }
        if (domain && domain !== "all") {
            searchQuery.domain = domain;
        }
        if (available && available !== "all") {
            if (available === "true")
                searchQuery.available = true;
            else if (available === "false")
                searchQuery.available = false;
        }
        const [totalUsers, users] = yield Promise.all([
            User_1.default.countDocuments(searchQuery),
            User_1.default.find(searchQuery)
                .lean()
                .skip((currentPage - 1) * perPage)
                .limit(perPage),
        ]);
        const totalPages = Math.ceil(totalUsers / perPage);
        if (totalPages > 0 && totalUsers > 0 && currentPage > totalPages) {
            return res.status(400).json({ message: "Page out of range" });
        }
        return res.status(200).json({
            users,
            currentPage,
            totalPages,
            totalUsers,
        });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new User_1.default(req.body);
        const savedUser = yield newUser.save();
        return res.status(201).json({ user: savedUser });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedUser = yield User_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user: updatedUser });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield User_1.default.findByIdAndRemove(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(204).send();
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map