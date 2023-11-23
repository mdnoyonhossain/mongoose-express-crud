/* eslint-disable no-unused-vars */
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

// Statics Method 
export interface IUserModel extends Model<TUser> {
    isExistsUser(userId: number): Promise<TUser | null>
}