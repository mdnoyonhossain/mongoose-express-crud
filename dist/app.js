"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
// Body Parser 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Applicaton Routes
app.use('/api', user_route_1.UserRoutes);
app.get('/', (req, res) => {
    res.send('Mongoose Express Typescript CRUD Backend Server is Running.');
});
exports.default = app;
