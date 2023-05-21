export interface ProductModel {
    id: number;
    name: string;
    code: string;
    price: number;
    createdDate: string;
    updatedDate: string;
    shortDescription?: string;
    fullDescription:string;
    status: number;
    creator: any;
    avatar: string;
}

export interface StatisticProduct {
    code: string;
    name: string;
    quantity: number;
    revenue: number;
}

export interface ProductTree extends StatisticProduct {
    key: string;
    parentKey: string;
    children: ProductTree[];
}