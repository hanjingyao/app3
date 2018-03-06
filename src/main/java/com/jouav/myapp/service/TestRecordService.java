package com.jouav.myapp.service;

import com.jouav.myapp.service.dto.TestRecordDTO;
import java.util.List;

/**
 * Service Interface for managing TestRecord.
 */
public interface TestRecordService {

    /**
     * Save a testRecord.
     *
     * @param testRecordDTO the entity to save
     * @return the persisted entity
     */
    TestRecordDTO save(TestRecordDTO testRecordDTO);

    /**
     * Get all the testRecords.
     *
     * @return the list of entities
     */
    List<TestRecordDTO> findAll();

    /**
     * Get the "id" testRecord.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TestRecordDTO findOne(Long id);

    /**
     * Delete the "id" testRecord.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
