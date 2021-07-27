"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
var yup = __importStar(require("yup"));
var Transaction_1 = require("../models/Transaction");
var HandleError_1 = require("../errors/HandleError");
var TransactionController = /** @class */ (function () {
    function TransactionController() {
    }
    TransactionController.prototype.createDeposit = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, title, amount, category, userId, schema, error_1, transactionModel;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = request.body, title = _b.title, amount = _b.amount, category = _b.category;
                        userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
                        schema = yup.object().shape({
                            title: yup.string().required(),
                            amount: yup.number().required(),
                            category: yup.string().required(),
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(request.body, { abortEarly: false })];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        return [2 /*return*/, response.status(400).json(HandleError_1.HandleError(error_1.errors))];
                    case 4:
                        transactionModel = new Transaction_1.Transaction({
                            title: title,
                            amount: amount,
                            type: 'deposit',
                            category: category,
                            user: userId,
                        });
                        return [4 /*yield*/, transactionModel.createTransaction()];
                    case 5:
                        _c.sent();
                        if (transactionModel.errors.length > 0) {
                            return [2 /*return*/, response.status(400).json(HandleError_1.HandleError(transactionModel.errors))];
                        }
                        return [2 /*return*/, response.json({ status: 'Created Successfully!', transaction: transactionModel.transaction })];
                }
            });
        });
    };
    TransactionController.prototype.createWithdraw = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, _b, title, amount, category, schema, error_2, transactionModel;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
                        _b = request.body, title = _b.title, amount = _b.amount, category = _b.category;
                        schema = yup.object().shape({
                            title: yup.string().required(),
                            amount: yup.number().required(),
                            category: yup.string().required(),
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(request.body, { abortEarly: false })];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _c.sent();
                        return [2 /*return*/, response.status(400).json(HandleError_1.HandleError(error_2.errors))];
                    case 4:
                        transactionModel = new Transaction_1.Transaction({
                            title: title,
                            amount: amount,
                            type: 'withdraw',
                            category: category,
                            user: userId,
                        });
                        return [4 /*yield*/, transactionModel.createTransaction()];
                    case 5:
                        _c.sent();
                        if (transactionModel.errors.length > 0) {
                            return [2 /*return*/, response.status(400).json(HandleError_1.HandleError(transactionModel.errors))];
                        }
                        return [2 /*return*/, response.json({ status: 'Created!', transaction: transactionModel.transaction })];
                }
            });
        });
    };
    TransactionController.prototype.getWithdraws = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, id, transaction, transactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = request.user.id;
                        id = request.params.id;
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, Transaction_1.Transaction.getWithdrawTransactions(userId, 1, id)];
                    case 1:
                        transaction = _a.sent();
                        return [2 /*return*/, response.json({ transaction: transaction })];
                    case 2: return [4 /*yield*/, Transaction_1.Transaction.getWithdrawTransactions(userId)];
                    case 3:
                        transactions = _a.sent();
                        return [2 /*return*/, response.json({ transactions: transactions })];
                }
            });
        });
    };
    TransactionController.prototype.getDeposits = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, id, transaction, transactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = request.user.id;
                        id = request.params.id;
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, Transaction_1.Transaction.getDepositTransactions(userId, 1, id)];
                    case 1:
                        transaction = _a.sent();
                        return [2 /*return*/, response.json({ transaction: transaction })];
                    case 2: return [4 /*yield*/, Transaction_1.Transaction.getDepositTransactions(userId)];
                    case 3:
                        transactions = _a.sent();
                        return [2 /*return*/, response.json({ transactions: transactions })];
                }
            });
        });
    };
    TransactionController.prototype.getTransactions = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, id, transaction, transactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = request.user.id;
                        id = request.params.id;
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, Transaction_1.Transaction.getAllTransactions(userId, 1, id)];
                    case 1:
                        transaction = _a.sent();
                        return [2 /*return*/, response.json({ transaction: transaction })];
                    case 2: return [4 /*yield*/, Transaction_1.Transaction.getAllTransactions(userId, 25)];
                    case 3:
                        transactions = _a.sent();
                        return [2 /*return*/, response.json({ transactions: transactions })];
                }
            });
        });
    };
    TransactionController.prototype.deleteTransaction = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, Transaction_1.Transaction.deleteTransaction(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.json({ status: 'Deleted Successfully!' })];
                }
            });
        });
    };
    TransactionController.prototype.updateTransaction = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, title, amount, category, type, id, userId, schema, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = request.body, title = _b.title, amount = _b.amount, category = _b.category, type = _b.type;
                        id = request.params.id;
                        userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!title && !amount && !category && !type) {
                            return [2 /*return*/, response.status(400).json(HandleError_1.HandleError('Invalid body!', 400))];
                        }
                        schema = yup.object().shape({
                            title: yup.string(),
                            amount: yup.number(),
                            category: yup.string(),
                            type: yup.string(),
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(request.body, { abortEarly: false })];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _c.sent();
                        return [2 /*return*/, response.status(400).json(HandleError_1.HandleError(error_3.errors))];
                    case 4: return [4 /*yield*/, Transaction_1.Transaction.updateTransaction(id, {
                            title: title,
                            amount: amount,
                            category: category,
                            type: type,
                            user: userId,
                        })];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, response.json({ status: 'Updated Successfully!' })];
                }
            });
        });
    };
    return TransactionController;
}());
exports.TransactionController = TransactionController;
