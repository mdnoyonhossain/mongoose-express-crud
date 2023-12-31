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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find({}, { _id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return users;
});
const getUserSpecificFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId }, { password: 0, _id: 0, orders: 0 });
    if (yield user_model_1.UserModel.isExistsUser(userId)) {
        return result;
    }
    else {
        throw new Error('User not Exists!');
    }
});
const updateUserFromDB = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ userId: userId }, { $set: updatedData });
    if (yield user_model_1.UserModel.isExistsUser(userId)) {
        return result;
    }
    else {
        throw new Error('User not Exists!');
    }
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.deleteOne({ userId });
    return result;
});
const userUpdateOrderDB = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne(userId, updatedData);
    return result;
});
const getUserOrderFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId }, { orders: 1, _id: 0 });
    if (yield user_model_1.UserModel.isExistsUser(userId)) {
        return result;
    }
    else {
        throw new Error('User not Exists!');
    }
});
const userOrderPriceCalculateFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const totalOrderPrice = yield user_model_1.UserModel.findOne({ userId });
    if (yield user_model_1.UserModel.isExistsUser(userId)) {
        return totalOrderPrice;
    }
    else {
        throw new Error('User not Exists!');
    }
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getUserSpecificFromDB,
    updateUserFromDB,
    deleteUserFromDB,
    userUpdateOrderDB,
    getUserOrderFromDB,
    userOrderPriceCalculateFromDB
};
