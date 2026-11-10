import prisma from '../config/prisma';
import { Status as GeneratedStatus } from '../generated/prisma/client';
import { Category, Item, ItemInput, Status } from '../types/item';

export interface ItemFilters {
    title?: string;
    category?: string;
}

interface ItemRow {
    id: number;
    title: string;
    category: string;
    genre: string;
    rating: string;
    status: string;
}

function toPrismaStatus(status: Status): GeneratedStatus {
    return status.replace(/-/g, '_') as GeneratedStatus;
}

function fromPrismaStatus(status: string): Status {
    return status.replace(/_/g, '-') as Status;
}

function toItem(row: ItemRow): Item {
    return {
        id: row.id,
        title: row.title,
        category: row.category as Category,
        genre: row.genre,
        rating: row.rating,
        status: fromPrismaStatus(row.status)
    };
}

export async function getAllItems(filters: ItemFilters): Promise<Item[]> {
    const where: {
        title?: { contains: string; mode: 'insensitive' };
        category?: Category;
    } = {};

    if (filters.title) {
        where.title = { contains: filters.title, mode: 'insensitive' };
    }
    if (filters.category) {
        where.category = filters.category as Category;
    }

    const rows = await prisma.item.findMany({ where });
    return rows.map(toItem);
}

export async function getItemById(id: number): Promise<Item | undefined> {
    const row = await prisma.item.findUnique({ where: { id } });
    return row ? toItem(row) : undefined;
}

export async function createItem(input: ItemInput): Promise<Item> {
    const row = await prisma.item.create({
        data: {
            title: input.title,
            category: input.category,
            genre: input.genre,
            rating: input.rating,
            status: toPrismaStatus(input.status)
        }
    });
    return toItem(row);
}

export async function updateItem(id: number, input: ItemInput): Promise<Item | undefined> {
    const existing = await getItemById(id);
    if (!existing) return undefined;

    const row = await prisma.item.update({
        where: { id },
        data: {
            title: input.title,
            category: input.category,
            genre: input.genre,
            rating: input.rating,
            status: toPrismaStatus(input.status)
        }
    });
    return toItem(row);
}

export async function deleteItem(id: number): Promise<Item | undefined> {
    const existing = await getItemById(id);
    if (!existing) return undefined;

    const row = await prisma.item.delete({ where: { id } });
    return toItem(row);
}
