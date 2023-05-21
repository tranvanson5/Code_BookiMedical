export interface SearchModel<T> {
    page: number,
    pageSize: number,
    data: T,
}

export interface ResponseServiceModel<T> {
    data: T[];
    page: number;
    pageSize: number;
    total: number;
    totalPage: number;
}