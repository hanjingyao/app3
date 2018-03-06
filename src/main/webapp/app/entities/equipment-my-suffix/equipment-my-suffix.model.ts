import { BaseEntity } from './../../shared';

export class EquipmentMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public equipment?: string,
        public orderTableId?: number,
    ) {
    }
}
