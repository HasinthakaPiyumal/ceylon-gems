"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGem = createGem;
exports.listGems = listGems;
exports.listCategories = listCategories;
exports.listByCategory = listByCategory;
exports.getGem = getGem;
exports.updateGem = updateGem;
exports.deleteGem = deleteGem;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createGem(req, res) {
    const { name, category, description, weight_carat, dimensions, color, clarity, cut, origin, certificate_url, price_usd, stock_quantity, status, image_url, gallery, } = req.body;
    if (!name ||
        !category ||
        !description ||
        weight_carat == null ||
        !dimensions ||
        !color ||
        !clarity ||
        !cut ||
        !origin ||
        !certificate_url ||
        price_usd == null ||
        stock_quantity == null ||
        !image_url) {
        return res.status(400).json({ message: "missing required fields" });
    }
    const created = await prisma.gem.create({
        data: {
            name,
            category,
            description,
            weight_carat: new client_1.Prisma.Decimal(weight_carat),
            dimensions,
            color,
            clarity,
            cut,
            origin,
            certificateUrl: certificate_url,
            priceUsd: new client_1.Prisma.Decimal(price_usd),
            stockQuantity: Number(stock_quantity),
            status: status || client_1.GemStatus.available,
            imageUrl: image_url,
            gallery: Array.isArray(gallery) ? gallery : [],
        },
    });
    res.status(201).json(created);
}
async function listGems(req, res) {
    const { q, status, category, skip = "0", take = "20" } = req.query;
    const where = {};
    if (status)
        where.status = status;
    if (category)
        where.category = { contains: String(category), mode: "insensitive" };
    if (q) {
        where.OR = [
            { name: { contains: String(q), mode: "insensitive" } },
            { description: { contains: String(q), mode: "insensitive" } },
            { color: { contains: String(q), mode: "insensitive" } },
            { origin: { contains: String(q), mode: "insensitive" } },
        ];
    }
    const [items, total] = await Promise.all([
        prisma.gem.findMany({
            where,
            skip: Number(skip),
            take: Number(take),
            orderBy: { createdAt: "desc" },
        }),
        prisma.gem.count({ where }),
    ]);
    res.json({ items, total });
}
async function listCategories(_req, res) {
    const groups = await prisma.gem.groupBy({
        by: ["category"],
        _count: { _all: true },
    });
    const items = await Promise.all(groups.map(async (g) => {
        const count = g._count._all;
        let image = null;
        if (count > 0) {
            const randomIndex = Math.floor(Math.random() * count);
            const pick = await prisma.gem.findMany({
                where: { category: g.category },
                select: { imageUrl: true },
                orderBy: { id: "asc" },
                skip: randomIndex,
                take: 1,
            });
            image = pick[0]?.imageUrl ?? null;
        }
        return { category: g.category, count, image };
    }));
    res.json({ items });
}
async function listByCategory(req, res) {
    const category = String(req.params.category);
    const { q, status, skip = "0", take = "20" } = req.query;
    const where = { category };
    if (status)
        where.status = status;
    if (q) {
        where.OR = [
            { name: { contains: String(q), mode: "insensitive" } },
            { description: { contains: String(q), mode: "insensitive" } },
            { color: { contains: String(q), mode: "insensitive" } },
            { origin: { contains: String(q), mode: "insensitive" } },
        ];
    }
    const [items, total] = await Promise.all([
        prisma.gem.findMany({
            where,
            skip: Number(skip),
            take: Number(take),
            orderBy: { createdAt: "desc" },
        }),
        prisma.gem.count({ where }),
    ]);
    res.json({ items, total, category });
}
async function getGem(req, res) {
    const id = Number(req.params.id);
    const gem = await prisma.gem.findUnique({ where: { id } });
    if (!gem)
        return res.status(404).json({ message: "not found" });
    res.json(gem);
}
async function updateGem(req, res) {
    const id = Number(req.params.id);
    const { name, category, description, weight_carat, dimensions, color, clarity, cut, origin, certificate_url, price_usd, stock_quantity, status, image_url, gallery, } = req.body;
    const updated = await prisma.gem.update({
        where: { id },
        data: {
            name,
            category,
            description,
            weight_carat: weight_carat != null ? new client_1.Prisma.Decimal(weight_carat) : undefined,
            dimensions,
            color,
            clarity,
            cut,
            origin,
            certificateUrl: certificate_url,
            priceUsd: price_usd != null ? new client_1.Prisma.Decimal(price_usd) : undefined,
            stockQuantity: stock_quantity != null ? Number(stock_quantity) : undefined,
            status: status,
            imageUrl: image_url,
            gallery: Array.isArray(gallery) ? gallery : undefined,
        },
    });
    res.json(updated);
}
async function deleteGem(req, res) {
    const id = Number(req.params.id);
    await prisma.gem.delete({ where: { id } });
    res.status(204).send();
}
//# sourceMappingURL=gems.controller.js.map