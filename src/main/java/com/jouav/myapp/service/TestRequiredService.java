package com.jouav.myapp.service;

import com.jouav.myapp.domain.TestRequired;
import com.jouav.myapp.service.dto.TestRequiredDTO;

import java.util.List;

/**
 * Service Interface for managing TestRequired.
 */
public interface TestRequiredService {

    /**
     * Save a testRequired.
     *
     * @param testRequiredDTO the entity to save
     * @return the persisted entity
     */
    TestRequiredDTO save(TestRequiredDTO testRequiredDTO);

    /**
     * Get all the testRequireds.
     *
     * @return the list of entities
     */
    List<TestRequiredDTO> findAll();

    /**
     * Get the "id" testRequired.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TestRequiredDTO findOne(Long id);

    /**
     * Delete the "id" testRequired.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**created by hanjingyao
     * Get all the testRequireds.
     *
     * @return the list of entities
     */
     List<TestRequired> findAllRequired(Long id);


}
