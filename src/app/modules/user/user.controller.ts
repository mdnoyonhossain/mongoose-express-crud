import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await UserServices.createUserIntoDB(user);

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
        }
        )
    }
}

export const UserControllers = {
    createUser,
}