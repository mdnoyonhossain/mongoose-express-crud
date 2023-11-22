"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().refine(data => !!data, { message: "First name is required" }),
    lastName: zod_1.z.string().refine(data => !!data, { message: "Last name is required" }),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().refine(data => !!data, { message: "Street is required" }),
    city: zod_1.z.string().refine(data => !!data, { message: "City is required" }),
    country: zod_1.z.string().refine(data => !!data, { message: "Country is required" }),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive().refine(data => !!data, { message: "User ID is required" }),
    username: zod_1.z.string().refine(data => !!data, { message: "Username is required" }),
    password: zod_1.z.string().min(6).refine(data => !!data, { message: "Password is required" }),
    fullName: userNameValidationSchema,
    age: zod_1.z.number().positive().refine(data => !!data, { message: "Age is required" }),
    email: zod_1.z.string().email().refine(data => !!data, { message: "Email is required" }),
    isActive: zod_1.z.boolean().refine(data => !!data, { message: "isActive is required" }),
    hobbies: zod_1.z.array(zod_1.z.string()).refine(data => !!data, { message: "Hobbies are required" }),
    address: addressValidationSchema,
});
exports.default = userValidationSchema;
