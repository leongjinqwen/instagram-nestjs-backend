import { Document } from 'mongoose';

export interface Item extends Document{
    id?: string;
    userId: string;
    description: string;
    completed: boolean;
} 