import { ProductModel } from './../../product/models/product.model';
export interface BillDetailModel {
    product: ProductModel;
    price: number;
    quantity: number;
}