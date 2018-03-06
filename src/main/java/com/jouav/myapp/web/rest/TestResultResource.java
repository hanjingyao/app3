package com.jouav.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jouav.myapp.service.TestResultService;
import com.jouav.myapp.web.rest.errors.BadRequestAlertException;
import com.jouav.myapp.web.rest.util.HeaderUtil;
import com.jouav.myapp.service.dto.TestResultDTO;
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
 * REST controller for managing TestResult.
 */
@RestController
@RequestMapping("/api")
public class TestResultResource {

    private final Logger log = LoggerFactory.getLogger(TestResultResource.class);

    private static final String ENTITY_NAME = "testResult";

    private final TestResultService testResultService;

    public TestResultResource(TestResultService testResultService) {
        this.testResultService = testResultService;
    }

    /**
     * POST  /test-results : Create a new testResult.
     *
     * @param testResultDTO the testResultDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testResultDTO, or with status 400 (Bad Request) if the testResult has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-results")
    @Timed
    public ResponseEntity<TestResultDTO> createTestResult(@RequestBody TestResultDTO testResultDTO) throws URISyntaxException {
        log.debug("REST request to save TestResult : {}", testResultDTO);
        if (testResultDTO.getId() != null) {
            throw new BadRequestAlertException("A new testResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestResultDTO result = testResultService.save(testResultDTO);
        return ResponseEntity.created(new URI("/api/test-results/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-results : Updates an existing testResult.
     *
     * @param testResultDTO the testResultDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testResultDTO,
     * or with status 400 (Bad Request) if the testResultDTO is not valid,
     * or with status 500 (Internal Server Error) if the testResultDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-results")
    @Timed
    public ResponseEntity<TestResultDTO> updateTestResult(@RequestBody TestResultDTO testResultDTO) throws URISyntaxException {
        log.debug("REST request to update TestResult : {}", testResultDTO);
        if (testResultDTO.getId() == null) {
            return createTestResult(testResultDTO);
        }
        TestResultDTO result = testResultService.save(testResultDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testResultDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-results : get all the testResults.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testResults in body
     */
    @GetMapping("/test-results")
    @Timed
    public List<TestResultDTO> getAllTestResults() {
        log.debug("REST request to get all TestResults");
        return testResultService.findAll();
        }

    /**
     * GET  /test-results/:id : get the "id" testResult.
     *
     * @param id the id of the testResultDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testResultDTO, or with status 404 (Not Found)
     */
    @GetMapping("/test-results/{id}")
    @Timed
    public ResponseEntity<TestResultDTO> getTestResult(@PathVariable Long id) {
        log.debug("REST request to get TestResult : {}", id);
        TestResultDTO testResultDTO = testResultService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testResultDTO));
    }

    /**
     * DELETE  /test-results/:id : delete the "id" testResult.
     *
     * @param id the id of the testResultDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-results/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestResult(@PathVariable Long id) {
        log.debug("REST request to delete TestResult : {}", id);
        testResultService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
