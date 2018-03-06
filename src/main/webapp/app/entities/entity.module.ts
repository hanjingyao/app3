import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { App3RegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { App3CountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { App3LocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { App3DepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { App3TaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { App3EmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { App3JobMySuffixModule } from './job-my-suffix/job-my-suffix.module';
import { App3JobHistoryMySuffixModule } from './job-history-my-suffix/job-history-my-suffix.module';
import { App3EquipmentMySuffixModule } from './equipment-my-suffix/equipment-my-suffix.module';
import { App3OrderTableMySuffixModule } from './order-table-my-suffix/order-table-my-suffix.module';
import { App3TestRequiredMySuffixModule } from './test-required-my-suffix/test-required-my-suffix.module';
import { App3TestResultMySuffixModule } from './test-result-my-suffix/test-result-my-suffix.module';
import { App3TestRecordMySuffixModule } from './test-record-my-suffix/test-record-my-suffix.module';
import { App3ProcedureTableMySuffixModule } from './procedure-table-my-suffix/procedure-table-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        App3RegionMySuffixModule,
        App3CountryMySuffixModule,
        App3LocationMySuffixModule,
        App3DepartmentMySuffixModule,
        App3TaskMySuffixModule,
        App3EmployeeMySuffixModule,
        App3JobMySuffixModule,
        App3JobHistoryMySuffixModule,
        App3EquipmentMySuffixModule,
        App3OrderTableMySuffixModule,
        App3TestRequiredMySuffixModule,
        App3TestResultMySuffixModule,
        App3TestRecordMySuffixModule,
        App3ProcedureTableMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App3EntityModule {}
