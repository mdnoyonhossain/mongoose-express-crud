import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation.schema";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        // Zod Validation 
        const zodParseData = userValidationSchema.parse(user)
        const result = await UserServices.createUserIntoDB(zodParseData);

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User not Create",
            error: {
                code: 404,
                description: error
            }
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const user = await UserServices.getAllUserFromDB();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}



export const UserControllers = {
    createUser,
    getAllUser,
}