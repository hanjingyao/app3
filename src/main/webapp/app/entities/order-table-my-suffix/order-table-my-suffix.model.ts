import { BaseEntity } from './../../shared';

export class OrderTableMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public rank?: string,
    ) {
    }
}
