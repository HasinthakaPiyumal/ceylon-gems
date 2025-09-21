"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireRole = requireRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "missing or invalid authorization header" });
    }
    const token = header.substring(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.user = { id: payload.sub, role: payload.role };
        next();
    }
    catch {
        return res.status(401).json({ message: "invalid or expired token" });
    }
}
function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ message: "unauthorized" });
        if (!roles.includes(req.user.role))
            return res.status(403).json({ message: "forbidden" });
        next();
    };
}
//# sourceMappingURL=auth.js.map