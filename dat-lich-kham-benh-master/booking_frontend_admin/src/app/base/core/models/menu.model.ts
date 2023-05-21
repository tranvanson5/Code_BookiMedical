export interface MenuModel {
    name?: string,
    isExpanded?: boolean,
    page?: string,
    icon?: string,
    children?: MenuModel[],
    authority: Authority[]
}

export enum Authority {
    MANAGER = 'MANAGER', 
    ADMIN = 'ADMIN'
}