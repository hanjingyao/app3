package com.jouav.myapp.service;

import com.jouav.myapp.service.dto.TestRecordingDTO;
import java.util.List;

/**
 * Service Interface for managing TestRecording.
 */
public interface TestRecordingService {

    /**
     * Save a testRecording.
     *
     * @param testRecordingDTO the entity to save
     * @return the persisted entity
     */
    TestRecordingDTO save(TestRecordingDTO testRecordingDTO);

    /**
     * Get all the testRecordings.
     *
     * @return the list of entities
     */
    List<TestRecordingDTO> findAll();

    /**
     * Get the "id" testRecording.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TestRecordingDTO findOne(Long id);

    /**
     * Delete the "id" testRecording.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
