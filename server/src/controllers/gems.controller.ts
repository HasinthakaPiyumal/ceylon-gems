import { Request, Response } from "express";
import { PrismaClient, Prisma, GemStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function createGem(req: Request, res: Response) {
  const {
    name,
    category,
    description,
    weight_carat,
    dimensions,
    color,
    clarity,
    cut,
    origin,
    certificate_url,
    price_usd,
    stock_quantity,
    status,
    image_url,
    gallery,
  } = req.body as any;

  if (
    !name ||
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
    !image_url
  ) {
    return res.status(400).json({ message: "missing required fields" });
  }

  const created = await prisma.gem.create({
    data: {
      name,
      category,
      description,
      weight_carat: new Prisma.Decimal(weight_carat),
      dimensions,
      color,
      clarity,
      cut,
      origin,
      certificateUrl: certificate_url,
      priceUsd: new Prisma.Decimal(price_usd),
      stockQuantity: Number(stock_quantity),
      status: (status as GemStatus) || GemStatus.available,
      imageUrl: image_url,
      gallery: Array.isArray(gallery) ? gallery : [],
    },
  });
  res.status(201).json(created);
}

export async function listGems(req: Request, res: Response) {
  const { q, status, category, skip = "0", take = "20" } = req.query as any;
  const where: any = {};
  if (status) where.status = status as GemStatus;
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

export async function listCategories(_req: Request, res: Response) {
  const groups = await prisma.gem.groupBy({
    by: ["category"],
    _count: { _all: true },
  });
  const items = await Promise.all(
    groups.map(async (g) => {
      const count = g._count._all;
      let image: string | null = null;
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
    })
  );
  res.json({ items });
}

export async function listByCategory(req: Request, res: Response) {
  const category = String(req.params.category);
  const { q, status, skip = "0", take = "20" } = req.query as any;
  const where: any = { category };
  if (status) where.status = status as GemStatus;
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

export async function getGem(req: Request, res: Response) {
  const id = Number(req.params.id);
  const gem = await prisma.gem.findUnique({ where: { id } });
  if (!gem) return res.status(404).json({ message: "not found" });
  res.json(gem);
}

export async function updateGem(req: Request, res: Response) {
  const id = Number(req.params.id);
  const {
    name,
    category,
    description,
    weight_carat,
    dimensions,
    color,
    clarity,
    cut,
    origin,
    certificate_url,
    price_usd,
    stock_quantity,
    status,
    image_url,
    gallery,
  } = req.body as any;

  const updated = await prisma.gem.update({
    where: { id },
    data: {
      name,
      category,
      description,
      weight_carat:
        weight_carat != null ? new Prisma.Decimal(weight_carat) : undefined,
      dimensions,
      color,
      clarity,
      cut,
      origin,
      certificateUrl: certificate_url,
      priceUsd: price_usd != null ? new Prisma.Decimal(price_usd) : undefined,
      stockQuantity:
        stock_quantity != null ? Number(stock_quantity) : undefined,
      status: status as GemStatus,
      imageUrl: image_url,
      gallery: Array.isArray(gallery) ? gallery : undefined,
    },
  });
  res.json(updated);
}

export async function deleteGem(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.gem.delete({ where: { id } });
  res.status(204).send();
}
