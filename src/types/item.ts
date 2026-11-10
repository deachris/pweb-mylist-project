export type Category = 'Film' | 'Series' | 'Books';
export type Status = 'not-started' | 'in-progress' | 'done';

export interface Item {
    id: number;
    title: string;
    category: Category;
    genre: string;
    rating: string;
    status: Status;
}

export interface ItemInput {
    title: string;
    category: Category;
    genre: string;
    rating: string;
    status: Status;
}

export const CATEGORIES: Category[] = ['Film', 'Series', 'Books'];
export const STATUSES: Status[] = ['not-started', 'in-progress', 'done'];
