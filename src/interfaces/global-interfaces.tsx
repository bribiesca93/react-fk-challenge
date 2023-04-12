export interface IProductAttr {
    code: string;
    position: number;
    quantity: number;
    image: string;
    price: number;
    description: string;
}

export interface IProductData {
    products: IProductAttr[];
}

export interface ISortInfo {
    prop: string;
    active: boolean;
    asc: boolean;
}