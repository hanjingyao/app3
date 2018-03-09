import { BaseEntity } from './../../shared';

export class TestRecordingMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public testRecord?: string,
    ) {
    }
}
