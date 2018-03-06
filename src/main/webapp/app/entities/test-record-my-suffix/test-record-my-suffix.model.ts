import { BaseEntity } from './../../shared';

export class TestRecordMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public testRecord?: string,
    ) {
    }
}
