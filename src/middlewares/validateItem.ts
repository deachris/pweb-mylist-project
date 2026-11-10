import { NextFunction, Request, Response } from 'express';
import { CATEGORIES, Category, ItemInput, STATUSES, Status } from '../types/item';

export function validateItem(req: Request, res: Response, next: NextFunction) {
    const { title, category, status, genre, rating } = req.body ?? {};

    if (!title || !category || !status) {
        res.status(400).json({ message: 'Title, category, dan status wajib diisi.' });
        return;
    }
    if (!CATEGORIES.includes(category as Category)) {
        res.status(400).json({ message: `Category harus salah satu dari: ${CATEGORIES.join(', ')}.` });
        return;
    }
    if (!STATUSES.includes(status as Status)) {
        res.status(400).json({ message: `Status harus salah satu dari: ${STATUSES.join(', ')}.` });
        return;
    }

    const input: ItemInput = {
        title: String(title).trim(),
        category,
        genre: genre ? String(genre).trim() : '',
        rating: rating ? String(rating) : '',
        status
    };
    req.body = input;
    next();
}
