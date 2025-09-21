"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = deleteAllUsers;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function deleteAllUsers(_req, res) {
    await prisma.user.deleteMany({});
    res.status(204).send();
}
//# sourceMappingURL=users.controller.js.map