package com.jouav.myapp.service;

import com.jouav.myapp.service.dto.TestResultDTO;
import java.util.List;

/**
 * Service Interface for managing TestResult.
 */
public interface TestResultService {

    /**
     * Save a testResult.
     *
     * @param testResultDTO the entity to save
     * @return the persisted entity
     */
    TestResultDTO save(TestResultDTO testResultDTO);

    /**
     * Get all the testResults.
     *
     * @return the list of entities
     */
    List<TestResultDTO> findAll();

    /**
     * Get the "id" testResult.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TestResultDTO findOne(Long id);

    /**
     * Delete the "id" testResult.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
