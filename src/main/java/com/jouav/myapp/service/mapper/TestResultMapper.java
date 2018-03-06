package com.jouav.myapp.service.mapper;

import com.jouav.myapp.domain.*;
import com.jouav.myapp.service.dto.TestResultDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TestResult and its DTO TestResultDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TestResultMapper extends EntityMapper<TestResultDTO, TestResult> {



    default TestResult fromId(Long id) {
        if (id == null) {
            return null;
        }
        TestResult testResult = new TestResult();
        testResult.setId(id);
        return testResult;
    }
}
