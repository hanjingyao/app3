package com.jouav.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jouav.myapp.service.TestRecordingService;
import com.jouav.myapp.web.rest.errors.BadRequestAlertException;
import com.jouav.myapp.web.rest.util.HeaderUtil;
import com.jouav.myapp.service.dto.TestRecordingDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TestRecording.
 */
@RestController
@RequestMapping("/api")
public class TestRecordingResource {

    private final Logger log = LoggerFactory.getLogger(TestRecordingResource.class);

    private static final String ENTITY_NAME = "testRecording";

    private final TestRecordingService testRecordingService;

    public TestRecordingResource(TestRecordingService testRecordingService) {
        this.testRecordingService = testRecordingService;
    }

    /**
     * POST  /test-recordings : Create a new testRecording.
     *
     * @param testRecordingDTO the testRecordingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testRecordingDTO, or with status 400 (Bad Request) if the testRecording has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-recordings")
    @Timed
    public ResponseEntity<TestRecordingDTO> createTestRecording(@RequestBody TestRecordingDTO testRecordingDTO) throws URISyntaxException {
        log.debug("REST request to save TestRecording : {}", testRecordingDTO);
        if (testRecordingDTO.getId() != null) {
            throw new BadRequestAlertException("A new testRecording cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestRecordingDTO result = testRecordingService.save(testRecordingDTO);
        return ResponseEntity.created(new URI("/api/test-recordings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-recordings : Updates an existing testRecording.
     *
     * @param testRecordingDTO the testRecordingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testRecordingDTO,
     * or with status 400 (Bad Request) if the testRecordingDTO is not valid,
     * or with status 500 (Internal Server Error) if the testRecordingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-recordings")
    @Timed
    public ResponseEntity<TestRecordingDTO> updateTestRecording(@RequestBody TestRecordingDTO testRecordingDTO) throws URISyntaxException {
        log.debug("REST request to update TestRecording : {}", testRecordingDTO);
        if (testRecordingDTO.getId() == null) {
            return createTestRecording(testRecordingDTO);
        }
        TestRecordingDTO result = testRecordingService.save(testRecordingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testRecordingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-recordings : get all the testRecordings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testRecordings in body
     */
    @GetMapping("/test-recordings")
    @Timed
    public List<TestRecordingDTO> getAllTestRecordings() {
        log.debug("REST request to get all TestRecordings");
        return testRecordingService.findAll();
        }

    /**
     * GET  /test-recordings/:id : get the "id" testRecording.
     *
     * @param id the id of the testRecordingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testRecordingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/test-recordings/{id}")
    @Timed
    public ResponseEntity<TestRecordingDTO> getTestRecording(@PathVariable Long id) {
        log.debug("REST request to get TestRecording : {}", id);
        TestRecordingDTO testRecordingDTO = testRecordingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testRecordingDTO));
    }

    /**
     * DELETE  /test-recordings/:id : delete the "id" testRecording.
     *
     * @param id the id of the testRecordingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-recordings/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestRecording(@PathVariable Long id) {
        log.debug("REST request to delete TestRecording : {}", id);
        testRecordingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
