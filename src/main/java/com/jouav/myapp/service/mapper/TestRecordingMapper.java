package com.jouav.myapp.service.mapper;

import com.jouav.myapp.domain.*;
import com.jouav.myapp.service.dto.TestRecordingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TestRecording and its DTO TestRecordingDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TestRecordingMapper extends EntityMapper<TestRecordingDTO, TestRecording> {



    default TestRecording fromId(Long id) {
        if (id == null) {
            return null;
        }
        TestRecording testRecording = new TestRecording();
        testRecording.setId(id);
        return testRecording;
    }
}
