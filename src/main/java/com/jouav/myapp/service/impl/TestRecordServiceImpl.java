package com.jouav.myapp.service.impl;

import com.jouav.myapp.service.TestRecordService;
import com.jouav.myapp.domain.TestRecord;
import com.jouav.myapp.repository.TestRecordRepository;
import com.jouav.myapp.service.dto.TestRecordDTO;
import com.jouav.myapp.service.mapper.TestRecordMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TestRecord.
 */
@Service
@Transactional
public class TestRecordServiceImpl implements TestRecordService {

    private final Logger log = LoggerFactory.getLogger(TestRecordServiceImpl.class);

    private final TestRecordRepository testRecordRepository;

    private final TestRecordMapper testRecordMapper;

    public TestRecordServiceImpl(TestRecordRepository testRecordRepository, TestRecordMapper testRecordMapper) {
        this.testRecordRepository = testRecordRepository;
        this.testRecordMapper = testRecordMapper;
    }

    /**
     * Save a testRecord.
     *
     * @param testRecordDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TestRecordDTO save(TestRecordDTO testRecordDTO) {
        log.debug("Request to save TestRecord : {}", testRecordDTO);
        TestRecord testRecord = testRecordMapper.toEntity(testRecordDTO);
        testRecord = testRecordRepository.save(testRecord);
        return testRecordMapper.toDto(testRecord);
    }

    /**
     * Get all the testRecords.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TestRecordDTO> findAll() {
        log.debug("Request to get all TestRecords");
        return testRecordRepository.findAll().stream()
            .map(testRecordMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one testRecord by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TestRecordDTO findOne(Long id) {
        log.debug("Request to get TestRecord : {}", id);
        TestRecord testRecord = testRecordRepository.findOne(id);
        return testRecordMapper.toDto(testRecord);
    }

    /**
     * Delete the testRecord by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TestRecord : {}", id);
        testRecordRepository.delete(id);
    }
}
