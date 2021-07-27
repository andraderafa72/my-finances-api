"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/* eslint-disable import/first */
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var routes_1 = require("./routes");
var database_1 = __importDefault(require("./database"));
database_1.default().then(function () {
    console.log('Conexão com o banco de dados estabelecida!');
}).catch(function (e) { return console.log('Erro ao conectar com o banco de dados!', e); });
exports.app = express_1.default();
var limiter = express_rate_limit_1.default({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
var options = {
    allowedHeaders: [
        'Origin',
        'Content-Type',
        'Accept',
        'authorization',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
};
exports.app.use(helmet_1.default());
exports.app.use(cors_1.default(options));
exports.app.options('*', cors_1.default(options));
exports.app.use(limiter);
exports.app.use(express_1.default.json());
exports.app.use(routes_1.router);
