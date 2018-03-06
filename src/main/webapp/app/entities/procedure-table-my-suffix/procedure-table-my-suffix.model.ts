import { BaseEntity } from './../../shared';

export class ProcedureTableMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public procedureTable?: string,
        public orderTableId?: number,
        public testRequireds?: BaseEntity[],
    ) {
    }
}
