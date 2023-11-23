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
    const result = await UserModel.findOne({ userId }, { password: 0, _id: 0 });
    if (await UserModel.isExistsUser(userId)) {
        return result;
    }
    else {
        throw new Error('User not Exists!');
    }
}

const deleteUserFromDB = async (userId: any) => {
    const result = await UserModel.deleteOne({ userId });
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getUserSpecificFromDB,
    deleteUserFromDB,
}