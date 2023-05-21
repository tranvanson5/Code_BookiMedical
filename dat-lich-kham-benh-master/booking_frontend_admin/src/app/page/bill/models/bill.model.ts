export interface BillModel {
    id: string;
    billPaypalId: string;
    paymentLink: string;
    createDate: string;
    username: string;
    total: number;
    status: string;
    idOrName?: string;
}

export interface BillTree {
    key: number;
    parentKey: number;
    revenue: number;
    growth: number;
    rateGrowth: number;
    children: BillTree[];
}