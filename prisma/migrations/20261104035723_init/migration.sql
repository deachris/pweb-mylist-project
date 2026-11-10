-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Film', 'Series', 'Books');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('not-started', 'in-progress', 'done');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "genre" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'not-started',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
