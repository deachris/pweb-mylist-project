import { Request, Response } from 'express';
import * as itemService from '../services/item.service';

function getParam(value: unknown): string | undefined {
    return typeof value === 'string' && value ? value : undefined;
}

export async function getAllItems(req: Request, res: Response) {
    const filters = {
        title: getParam(req.query.title),
        category: getParam(req.query.category)
    };
    res.json(await itemService.getAllItems(filters));
}

export async function createItem(req: Request, res: Response) {
    const item = await itemService.createItem(req.body);
    res.status(201).json(item);
}

export async function updateItem(req: Request, res: Response) {
    const item = await itemService.updateItem(Number(req.params.id), req.body);
    if (!item) {
        res.status(404).json({ message: 'Data tidak ditemukan.' });
        return;
    }
    res.json(item);
}

export async function deleteItem(req: Request, res: Response) {
    const item = await itemService.deleteItem(Number(req.params.id));
    if (!item) {
        res.status(404).json({ message: 'Data tidak ditemukan.' });
        return;
    }
    res.json(item);
}
