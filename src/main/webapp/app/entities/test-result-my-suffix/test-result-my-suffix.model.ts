import { BaseEntity } from './../../shared';

export class TestResultMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public testResult?: string,
    ) {
    }
}
