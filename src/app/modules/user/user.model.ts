import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { TAddress, TUser, TUserName } from "./user.interface";

const userNameSchema = new Schema<TUserName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
})

const userSchema = new Schema<TUser>({
    userId: { type: Number, unique: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    fullName: { type: userNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: [{ type: String, required: true }],
    address: { type: addressSchema, required: true }
});

userSchema.pre('save', async function (next) {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next()
})

userSchema.post('save', async function (doc, next) {
    doc.password = undefined;
    next();
})


export const UserModel = model<TUser>('user', userSchema);