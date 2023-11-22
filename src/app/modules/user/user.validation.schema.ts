import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z.string().refine(data => !!data, { message: "First name is required" }),
    lastName: z.string().refine(data => !!data, { message: "Last name is required" }),
});

const addressValidationSchema = z.object({
    street: z.string().refine(data => !!data, { message: "Street is required" }),
    city: z.string().refine(data => !!data, { message: "City is required" }),
    country: z.string().refine(data => !!data, { message: "Country is required" }),
});

const userValidationSchema = z.object({
    userId: z.number().int().positive().refine(data => !!data, { message: "User ID is required" }),
    username: z.string().refine(data => !!data, { message: "Username is required" }),
    password: z.string().min(6).refine(data => !!data, { message: "Password is required" }),
    fullName: userNameValidationSchema,
    age: z.number().positive().refine(data => !!data, { message: "Age is required" }),
    email: z.string().email().refine(data => !!data, { message: "Email is required" }),
    isActive: z.boolean().refine(data => !!data, { message: "isActive is required" }),
    hobbies: z.array(z.string()).refine(data => !!data, { message: "Hobbies are required" }),
    address: addressValidationSchema,
});

export default userValidationSchema;