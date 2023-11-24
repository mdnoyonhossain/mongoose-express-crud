/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation.schema";

// Create User Controller
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
        res.status(404).json({
            success: false,
            message: "User not Create",
            error: {
                code: 404,
                description: error
            }
        })
    }
}

// all User Controller
const getAllUser = async (req: Request, res: Response) => {
    try {
        const user = await UserServices.getAllUserFromDB();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}

// Single User Controller
const getSpecificUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await UserServices.getUserSpecificFromDB(userId);

        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        });
    }
}

// update user controller
const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const result = await UserServices.updateUserFromDB(userId, updatedData);

        // Update Response Data hide 
        updatedData.password = undefined;

        if (result.matchedCount === 1 && result.modifiedCount === 1 && result.acknowledged === true && userId) {
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: updatedData
            });
        } 

    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        });
    }
}

// Delete User Controller
const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const result = await UserServices.deleteUserFromDB(userId)

        if (result.deletedCount === 1) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: result
            })
        } else {
            throw new Error('Uesr not found!')
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        })
    }
}

// user Order 
const userOrderUpdate = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const productData = req.body;

        const result = await UserServices.userUpdateOrderDB(
            { userId },
            {
                $push: {
                    orders: {
                        productName: productData.productName,
                        price: productData.price,
                        quantity: productData.quantity,
                    },
                },
            }
        );

        if (result.modifiedCount > 0 && userId) {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: productData,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not Exists!"
                }
            })
        }
    }
    catch (error: any) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        })
    }
}

// Get user Order 
const getUserOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.userId;
        const result = await UserServices.getUserOrderFromDB(id);

        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result
        })
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        })
    }
}

// Calculate Total Price of Orders for Specific User
const userOrderPriceCalculate = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await UserServices.userOrderPriceCalculateFromDB(userId);
        // Total Order Price 
        const totalPrice = user?.orders?.reduce((init, order) => init + order.price * order.quantity, 0);

        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: {
                totalPrice: totalPrice
            }
        });

    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!"
            }
        })
    }
}

export const UserControllers = {
    createUser,
    getAllUser,
    getSpecificUser,
    updateUser,
    deleteUser,
    userOrderUpdate,
    getUserOrder,
    userOrderPriceCalculate
}