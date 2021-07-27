"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var UserController_1 = require("./controllers/UserController");
var TokenController_1 = require("./controllers/TokenController");
var TransactionController_1 = require("./controllers/TransactionController");
var LoginRequired_1 = __importDefault(require("./middlewares/LoginRequired"));
var userController = new UserController_1.UserController();
var tokenController = new TokenController_1.TokenController();
var transactionController = new TransactionController_1.TransactionController();
exports.router = express_1.Router();
exports.router.post('/user/create', userController.create);
exports.router.post('/api/auth', tokenController.create);
exports.router.post('/transactions', LoginRequired_1.default, transactionController.createTransaction);
exports.router.get('/transactions/:id?', LoginRequired_1.default, transactionController.getTransactions);
exports.router.get('/transactions/withdraw/:id?', LoginRequired_1.default, transactionController.getWithdraws);
exports.router.get('/transactions/deposit/:id?', LoginRequired_1.default, transactionController.getDeposits);
exports.router.patch('/transactions/update/:id', LoginRequired_1.default, transactionController.updateTransaction);
exports.router.delete('/transactions/delete/:id', LoginRequired_1.default, transactionController.getTransactions);
