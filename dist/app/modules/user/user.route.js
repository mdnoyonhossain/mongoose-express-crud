"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/users', user_controller_1.UserControllers.createUser);
router.get('/users', user_controller_1.UserControllers.getAllUser);
router.get('/users/:userId', user_controller_1.UserControllers.getSpecificUser);
router.put('/users/:userId', user_controller_1.UserControllers.updateUser);
router.delete('/users/:userId', user_controller_1.UserControllers.deleteUser);
exports.UserRoutes = router;
