"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().required(),
    lastName: zod_1.z.string().required(),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().required(),
    city: zod_1.z.string().required(),
    country: zod_1.z.string().required(),
});
const userSchema = zod_1.z.object({
    userId: zod_1.z.number().positive(),
    username: zod_1.z.string(),
    password: zod_1.z.string().required(),
    fullName: userNameSchema.required(),
    age: zod_1.z.number().positive().int(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()).min(1),
    address: addressSchema.required(),
});
