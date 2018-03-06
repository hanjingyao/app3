import { BaseEntity } from './../../shared';

export class TestRequiredMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public testRequiredOfAll?: string,
        public testResultId?: number,
        public testRecordId?: number,
        public procedureTableId?: number,
    ) {
    }
}
