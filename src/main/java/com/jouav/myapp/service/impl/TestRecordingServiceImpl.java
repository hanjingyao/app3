package com.jouav.myapp.service.impl;

import com.jouav.myapp.service.TestRecordingService;
import com.jouav.myapp.domain.TestRecording;
import com.jouav.myapp.repository.TestRecordingRepository;
import com.jouav.myapp.service.dto.TestRecordingDTO;
import com.jouav.myapp.service.mapper.TestRecordingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TestRecording.
 */
@Service
@Transactional
public class TestRecordingServiceImpl implements TestRecordingService {

    private final Logger log = LoggerFactory.getLogger(TestRecordingServiceImpl.class);

    private final TestRecordingRepository testRecordingRepository;

    private final TestRecordingMapper testRecordingMapper;

    public TestRecordingServiceImpl(TestRecordingRepository testRecordingRepository, TestRecordingMapper testRecordingMapper) {
        this.testRecordingRepository = testRecordingRepository;
        this.testRecordingMapper = testRecordingMapper;
    }

    /**
     * Save a testRecording.
     *
     * @param testRecordingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TestRecordingDTO save(TestRecordingDTO testRecordingDTO) {
        log.debug("Request to save TestRecording : {}", testRecordingDTO);
        TestRecording testRecording = testRecordingMapper.toEntity(testRecordingDTO);
        testRecording = testRecordingRepository.save(testRecording);
        return testRecordingMapper.toDto(testRecording);
    }

    /**
     * Get all the testRecordings.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TestRecordingDTO> findAll() {
        log.debug("Request to get all TestRecordings");
        return testRecordingRepository.findAll().stream()
            .map(testRecordingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one testRecording by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TestRecordingDTO findOne(Long id) {
        log.debug("Request to get TestRecording : {}", id);
        TestRecording testRecording = testRecordingRepository.findOne(id);
        return testRecordingMapper.toDto(testRecording);
    }

    /**
     * Delete the testRecording by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TestRecording : {}", id);
        testRecordingRepository.delete(id);
    }
}
