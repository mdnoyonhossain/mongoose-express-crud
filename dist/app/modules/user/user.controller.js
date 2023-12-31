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
// Create User Controller
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
        res.status(404).json({
            success: false,
            message: "User not Create",
            error: {
                code: 404,
                description: error
            }
        });
    }
});
// all User Controller
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
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        });
    }
});
// Single User Controller
const getSpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getUserSpecificFromDB(userId);
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        });
    }
});
// update user controller
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const result = yield user_service_1.UserServices.updateUserFromDB(userId, updatedData);
        // Update Response Data hide 
        updatedData.password = undefined;
        if (result.matchedCount === 1 && result.modifiedCount === 1 && result.acknowledged === true && userId) {
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: updatedData
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        });
    }
});
// Delete User Controller
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.UserServices.deleteUserFromDB(userId);
        if (result.deletedCount === 1) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: result
            });
        }
        else {
            throw new Error('Uesr not found!');
        }
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
// user Order 
const userOrderUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const productData = req.body;
        const result = yield user_service_1.UserServices.userUpdateOrderDB({ userId }, {
            $push: {
                orders: {
                    productName: productData.productName,
                    price: productData.price,
                    quantity: productData.quantity,
                },
            },
        });
        if (result.modifiedCount > 0 && userId) {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: productData,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not Exists!"
                }
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        });
    }
});
// Get user Order 
const getUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.UserServices.getUserOrderFromDB(id);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        });
    }
});
// Calculate Total Price of Orders for Specific User
const userOrderPriceCalculate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        const user = yield user_service_1.UserServices.userOrderPriceCalculateFromDB(userId);
        // Total Order Price 
        const totalPrice = (_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.reduce((init, order) => init + order.price * order.quantity, 0);
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: {
                totalPrice: totalPrice
            }
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUser,
    getSpecificUser,
    updateUser,
    deleteUser,
    userOrderUpdate,
    getUserOrder,
    userOrderPriceCalculate
};
