package com.jouav.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jouav.myapp.service.TestRecordService;
import com.jouav.myapp.web.rest.errors.BadRequestAlertException;
import com.jouav.myapp.web.rest.util.HeaderUtil;
import com.jouav.myapp.service.dto.TestRecordDTO;
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
 * REST controller for managing TestRecord.
 */
@RestController
@RequestMapping("/api")
public class TestRecordResource {

    private final Logger log = LoggerFactory.getLogger(TestRecordResource.class);

    private static final String ENTITY_NAME = "testRecord";

    private final TestRecordService testRecordService;

    public TestRecordResource(TestRecordService testRecordService) {
        this.testRecordService = testRecordService;
    }

    /**
     * POST  /test-records : Create a new testRecord.
     *
     * @param testRecordDTO the testRecordDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testRecordDTO, or with status 400 (Bad Request) if the testRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-records")
    @Timed
    public ResponseEntity<TestRecordDTO> createTestRecord(@RequestBody TestRecordDTO testRecordDTO) throws URISyntaxException {
        log.debug("REST request to save TestRecord : {}", testRecordDTO);
        if (testRecordDTO.getId() != null) {
            throw new BadRequestAlertException("A new testRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestRecordDTO result = testRecordService.save(testRecordDTO);
        return ResponseEntity.created(new URI("/api/test-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-records : Updates an existing testRecord.
     *
     * @param testRecordDTO the testRecordDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testRecordDTO,
     * or with status 400 (Bad Request) if the testRecordDTO is not valid,
     * or with status 500 (Internal Server Error) if the testRecordDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-records")
    @Timed
    public ResponseEntity<TestRecordDTO> updateTestRecord(@RequestBody TestRecordDTO testRecordDTO) throws URISyntaxException {
        log.debug("REST request to update TestRecord : {}", testRecordDTO);
        if (testRecordDTO.getId() == null) {
            return createTestRecord(testRecordDTO);
        }
        TestRecordDTO result = testRecordService.save(testRecordDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testRecordDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-records : get all the testRecords.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testRecords in body
     */
    @GetMapping("/test-records")
    @Timed
    public List<TestRecordDTO> getAllTestRecords() {
        log.debug("REST request to get all TestRecords");
        return testRecordService.findAll();
        }

    /**
     * GET  /test-records/:id : get the "id" testRecord.
     *
     * @param id the id of the testRecordDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testRecordDTO, or with status 404 (Not Found)
     */
    @GetMapping("/test-records/{id}")
    @Timed
    public ResponseEntity<TestRecordDTO> getTestRecord(@PathVariable Long id) {
        log.debug("REST request to get TestRecord : {}", id);
        TestRecordDTO testRecordDTO = testRecordService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testRecordDTO));
    }

    /**
     * DELETE  /test-records/:id : delete the "id" testRecord.
     *
     * @param id the id of the testRecordDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestRecord(@PathVariable Long id) {
        log.debug("REST request to delete TestRecord : {}", id);
        testRecordService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
