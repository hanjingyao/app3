package com.jouav.myapp.service.mapper;

import com.jouav.myapp.domain.*;
import com.jouav.myapp.service.dto.TestRequiredDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TestRequired and its DTO TestRequiredDTO.
 */
@Mapper(componentModel = "spring", uses = {TestResultMapper.class, TestRecordMapper.class, ProcedureTableMapper.class})
public interface TestRequiredMapper extends EntityMapper<TestRequiredDTO, TestRequired> {

    @Mapping(source = "testResult.id", target = "testResultId")
    @Mapping(source = "testRecord.id", target = "testRecordId")
    @Mapping(source = "procedureTable.id", target = "procedureTableId")
    TestRequiredDTO toDto(TestRequired testRequired);

    @Mapping(source = "testResultId", target = "testResult")
    @Mapping(source = "testRecordId", target = "testRecord")
    @Mapping(source = "procedureTableId", target = "procedureTable")
    TestRequired toEntity(TestRequiredDTO testRequiredDTO);

    default TestRequired fromId(Long id) {
        if (id == null) {
            return null;
        }
        TestRequired testRequired = new TestRequired();
        testRequired.setId(id);
        return testRequired;
    }
}
