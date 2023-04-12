import data from '../assets/products.json';
import { IProductAttr, IProductData } from '../interfaces/global-interfaces';

export class DataReaderService {
    seekCoincidence(clue: string): IProductAttr[] {
        let response = (data as IProductData).products;
        if(clue.length) {
            response = response.filter(item => Object.values(item).join('|').toLowerCase().includes(clue.toLowerCase()));
        }

        return response;
    }

    sort(data: IProductAttr[], prop: string, asc: boolean): IProductAttr[] {
        if(!data.length) {
            return data;
        }

        const val = asc ? 1 : -1;
        return data.sort((a, b) => {
            // @ts-ignore
            if(a[prop] === b[prop]) {
                return 0;
            }

            // @ts-ignore
            return a[prop] >= b[prop] ? val : val * -1;
        })
    }
}