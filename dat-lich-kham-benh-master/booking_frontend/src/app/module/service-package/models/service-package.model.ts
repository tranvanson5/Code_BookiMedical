export interface ServicePackage {
    id: number;
    code: string;
    name: string;
    price: number;
    shortDescription: string;
    fullDescription: string;
    createdDate: string;
    updatedDate: string;
    status: number;
    avatar: string;
    creator: any;
    quantity: number;
}

export interface Item extends ServicePackage {
    uuid: string;
}