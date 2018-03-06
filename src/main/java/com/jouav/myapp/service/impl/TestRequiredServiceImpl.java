package com.jouav.myapp.service.impl;

import com.jouav.myapp.service.TestRequiredService;
import com.jouav.myapp.domain.TestRequired;
import com.jouav.myapp.repository.TestRequiredRepository;
import com.jouav.myapp.service.dto.TestRequiredDTO;
import com.jouav.myapp.service.mapper.TestRequiredMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TestRequired.
 */
@Service
@Transactional
public class TestRequiredServiceImpl implements TestRequiredService {

    private final Logger log = LoggerFactory.getLogger(TestRequiredServiceImpl.class);

    private final TestRequiredRepository testRequiredRepository;

    private final TestRequiredMapper testRequiredMapper;

    public TestRequiredServiceImpl(TestRequiredRepository testRequiredRepository, TestRequiredMapper testRequiredMapper) {
        this.testRequiredRepository = testRequiredRepository;
        this.testRequiredMapper = testRequiredMapper;
    }

    /**
     * Save a testRequired.
     *
     * @param testRequiredDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TestRequiredDTO save(TestRequiredDTO testRequiredDTO) {
        log.debug("Request to save TestRequired : {}", testRequiredDTO);
        TestRequired testRequired = testRequiredMapper.toEntity(testRequiredDTO);
        testRequired = testRequiredRepository.save(testRequired);
        return testRequiredMapper.toDto(testRequired);
    }

    /**
     * Get all the testRequireds.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TestRequiredDTO> findAll() {
        log.debug("Request to get all TestRequireds");
        return testRequiredRepository.findAll().stream()
            .map(testRequiredMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one testRequired by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TestRequiredDTO findOne(Long id) {
        log.debug("Request to get TestRequired : {}", id);
        TestRequired testRequired = testRequiredRepository.findOne(id);
        return testRequiredMapper.toDto(testRequired);
    }

    /**
     * Delete the testRequired by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TestRequired : {}", id);
        testRequiredRepository.delete(id);
    }
}
