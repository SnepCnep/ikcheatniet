export type Partner = {
    id: string;
    name?: string;
    type?: string;
    description?: string;
    banner?: string | null;
    logo?: string | null;
    links?: any;
    category?: string;
    features?: any;
    special?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
};