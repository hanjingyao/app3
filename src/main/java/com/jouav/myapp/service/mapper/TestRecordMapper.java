package com.jouav.myapp.service.mapper;

import com.jouav.myapp.domain.*;
import com.jouav.myapp.service.dto.TestRecordDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TestRecord and its DTO TestRecordDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TestRecordMapper extends EntityMapper<TestRecordDTO, TestRecord> {



    default TestRecord fromId(Long id) {
        if (id == null) {
            return null;
        }
        TestRecord testRecord = new TestRecord();
        testRecord.setId(id);
        return testRecord;
    }
}
