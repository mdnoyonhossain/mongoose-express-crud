/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
    const result = await UserModel.create(user);
    return result;
}

const getAllUserFromDB = async () => {
    const users = await UserModel.find({}, { _id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return users;
}

const getUserSpecificFromDB = async (userId: any) => {
    const result = await UserModel.findOne({ userId }, { password: 0, _id: 0, orders: 0 });
    if (await UserModel.isExistsUser(userId)) {
        return result;
    }
    else {
        throw new Error('User not Exists!');
    }
}

const updateUserFromDB = async (userId: any, updatedData: TUser) => {
    const result = await UserModel.updateOne({ userId: userId }, { $set: updatedData });
    if (await UserModel.isExistsUser(userId)) {
        return result
    }
    else {
        throw new Error('User not Exists!');
    }
}

const deleteUserFromDB = async (userId: any) => {
    const result = await UserModel.deleteOne({ userId });
    return result;
}

const userUpdateOrderDB = async (userId: any, updatedData: any) => {
    const result = await UserModel.updateOne(userId, updatedData);
    return result;
}

const getUserOrderFromDB = async (userId: any) => {
    const result = await UserModel.findOne({ userId }, { orders: 1, _id: 0 });

    if (await UserModel.isExistsUser(userId)) {
        return result
    }
    else {
        throw new Error('User not Exists!');
    }
}

const userOrderPriceCalculateFromDB = async (userId: any) => {
    const totalOrderPrice = await UserModel.findOne({ userId });

    if (await UserModel.isExistsUser(userId)) {
        return totalOrderPrice
    }
    else {
        throw new Error('User not Exists!');
    }
}

export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getUserSpecificFromDB,
    updateUserFromDB,
    deleteUserFromDB,
    userUpdateOrderDB,
    getUserOrderFromDB,
    userOrderPriceCalculateFromDB
}