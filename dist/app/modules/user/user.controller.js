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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_schema_1 = __importDefault(require("./user.validation.schema"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        // Zod Validation 
        const zodParseData = user_validation_schema_1.default.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParseData);
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "User not Create",
            error: {
                code: 404,
                description: error
            }
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        });
    }
});
const getSpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.UserServices.getUserSpecificFromDB(userId);
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.UserServices.deleteUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUser,
    getSpecificUser,
    deleteUser
};
