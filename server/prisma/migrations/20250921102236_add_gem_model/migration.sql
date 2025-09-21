-- CreateEnum
CREATE TYPE "public"."GemStatus" AS ENUM ('available', 'sold', 'reserved');

-- CreateTable
CREATE TABLE "public"."Gem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight_carat" DECIMAL(10,2) NOT NULL,
    "dimensions" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "clarity" TEXT NOT NULL,
    "cut" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "certificateUrl" TEXT NOT NULL,
    "priceUsd" DECIMAL(12,2) NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "status" "public"."GemStatus" NOT NULL DEFAULT 'available',
    "imageUrl" TEXT NOT NULL,
    "gallery" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gem_pkey" PRIMARY KEY ("id")
);
