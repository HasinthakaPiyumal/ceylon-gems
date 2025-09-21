"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const auth_1 = __importDefault(require("./routes/auth"));
const protected_1 = __importDefault(require("./routes/protected"));
const gems_1 = __importDefault(require("./routes/gems"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use("/auth", auth_1.default);
app.use("/api", protected_1.default);
app.use("/api/gems", gems_1.default);
app.use("/api/users", users_1.default);
app.listen(env_1.env.port, () => {
    console.log(`server listening on http://localhost:${env_1.env.port}`);
});
//# sourceMappingURL=index.js.map