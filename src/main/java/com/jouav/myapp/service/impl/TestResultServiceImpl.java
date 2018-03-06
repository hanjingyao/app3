package com.jouav.myapp.service.impl;

import com.jouav.myapp.service.TestResultService;
import com.jouav.myapp.domain.TestResult;
import com.jouav.myapp.repository.TestResultRepository;
import com.jouav.myapp.service.dto.TestResultDTO;
import com.jouav.myapp.service.mapper.TestResultMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TestResult.
 */
@Service
@Transactional
public class TestResultServiceImpl implements TestResultService {

    private final Logger log = LoggerFactory.getLogger(TestResultServiceImpl.class);

    private final TestResultRepository testResultRepository;

    private final TestResultMapper testResultMapper;

    public TestResultServiceImpl(TestResultRepository testResultRepository, TestResultMapper testResultMapper) {
        this.testResultRepository = testResultRepository;
        this.testResultMapper = testResultMapper;
    }

    /**
     * Save a testResult.
     *
     * @param testResultDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TestResultDTO save(TestResultDTO testResultDTO) {
        log.debug("Request to save TestResult : {}", testResultDTO);
        TestResult testResult = testResultMapper.toEntity(testResultDTO);
        testResult = testResultRepository.save(testResult);
        return testResultMapper.toDto(testResult);
    }

    /**
     * Get all the testResults.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TestResultDTO> findAll() {
        log.debug("Request to get all TestResults");
        return testResultRepository.findAll().stream()
            .map(testResultMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one testResult by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TestResultDTO findOne(Long id) {
        log.debug("Request to get TestResult : {}", id);
        TestResult testResult = testResultRepository.findOne(id);
        return testResultMapper.toDto(testResult);
    }

    /**
     * Delete the testResult by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TestResult : {}", id);
        testResultRepository.delete(id);
    }
}
