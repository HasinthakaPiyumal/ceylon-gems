"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const prisma = new client_1.PrismaClient();
async function signup(req, res) {
    const { name, email, password, phone, address, role } = req.body;
    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "name, email and password are required" });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return res.status(409).json({ message: "email already in use" });
    }
    const hashed = await bcrypt_1.default.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashed,
            phone,
            address,
            role: role || undefined,
        },
    });
    const token = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, env_1.env.jwtSecret, {
        expiresIn: "7d",
    });
    res.status(201).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
        },
    });
}
async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "email and password are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: "invalid credentials" });
    }
    const ok = await bcrypt_1.default.compare(password, user.password);
    if (!ok) {
        return res.status(401).json({ message: "invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, env_1.env.jwtSecret, {
        expiresIn: "7d",
    });
    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
        },
    });
}
//# sourceMappingURL=auth.controller.js.map