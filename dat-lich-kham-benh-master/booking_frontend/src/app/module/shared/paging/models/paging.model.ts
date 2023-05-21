export interface PagingRequest<T> {
    page: number;
    pageSize: number;
    data: Partial<T>;
}

export interface PagingResponse<T> {
    page: number;
    pageSize: number;
    total: number;
    totalPage: number;
    data: T[];
}

export interface Paging {
    
}