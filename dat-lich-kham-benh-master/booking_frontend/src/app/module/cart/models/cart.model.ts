import { ServicePackage } from './../../service-package';

export interface Cart {
    id: number;
    quantity: number;
    product: ServicePackage;
}