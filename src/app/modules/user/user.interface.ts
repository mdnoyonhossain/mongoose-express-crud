import { Model } from "mongoose";

export type TUserName = {
    firstName: string;
    lastName: string;
}

export type TAddress = {
    street: string;
    city: string;
    country: string;
}

export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TUserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TAddress;
}

// Instance Method 
export interface IUserModel extends Model<TUser> {
    // eslint-disable-next-line no-unused-vars
    isExistsUser(userId: number): Promise<TUser | null>
}