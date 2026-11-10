import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({ message: 'Route tidak ditemukan.' });
}

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
}
