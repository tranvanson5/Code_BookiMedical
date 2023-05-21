import { ServicePackage } from "../../service-package";

export interface CheckoutResponse {
    linkPayment: string;
}

export interface Bill {
    id: string;
    paymentLink: string;
    status: string;
    createdDate: string;
    total: number;
}

export interface BillDetail {
    id: number;
    quantity: number;
    price: number;
    product: ServicePackage,
}