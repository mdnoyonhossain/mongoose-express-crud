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

const getUserSpecificFromDB = async (userId: string) => {
    const result = await UserModel.findOne({ userId }, { password: 0, _id: 0 });
    if (await !UserModel.isExistsUser) {
        throw Error('User Not Exists');
    }
    return result;
}

const deleteUserFromDB = async (userId: string) => {
    const result = await UserModel.deleteOne({userId});
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getUserSpecificFromDB,
    deleteUserFromDB,
}