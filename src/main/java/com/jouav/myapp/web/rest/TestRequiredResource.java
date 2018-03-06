package com.jouav.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jouav.myapp.service.TestRequiredService;
import com.jouav.myapp.web.rest.errors.BadRequestAlertException;
import com.jouav.myapp.web.rest.util.HeaderUtil;
import com.jouav.myapp.service.dto.TestRequiredDTO;
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
 * REST controller for managing TestRequired.
 */
@RestController
@RequestMapping("/api")
public class TestRequiredResource {

    private final Logger log = LoggerFactory.getLogger(TestRequiredResource.class);

    private static final String ENTITY_NAME = "testRequired";

    private final TestRequiredService testRequiredService;

    public TestRequiredResource(TestRequiredService testRequiredService) {
        this.testRequiredService = testRequiredService;
    }

    /**
     * POST  /test-requireds : Create a new testRequired.
     *
     * @param testRequiredDTO the testRequiredDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testRequiredDTO, or with status 400 (Bad Request) if the testRequired has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-requireds")
    @Timed
    public ResponseEntity<TestRequiredDTO> createTestRequired(@RequestBody TestRequiredDTO testRequiredDTO) throws URISyntaxException {
        log.debug("REST request to save TestRequired : {}", testRequiredDTO);
        if (testRequiredDTO.getId() != null) {
            throw new BadRequestAlertException("A new testRequired cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestRequiredDTO result = testRequiredService.save(testRequiredDTO);
        return ResponseEntity.created(new URI("/api/test-requireds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-requireds : Updates an existing testRequired.
     *
     * @param testRequiredDTO the testRequiredDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testRequiredDTO,
     * or with status 400 (Bad Request) if the testRequiredDTO is not valid,
     * or with status 500 (Internal Server Error) if the testRequiredDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-requireds")
    @Timed
    public ResponseEntity<TestRequiredDTO> updateTestRequired(@RequestBody TestRequiredDTO testRequiredDTO) throws URISyntaxException {
        log.debug("REST request to update TestRequired : {}", testRequiredDTO);
        if (testRequiredDTO.getId() == null) {
            return createTestRequired(testRequiredDTO);
        }
        TestRequiredDTO result = testRequiredService.save(testRequiredDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testRequiredDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-requireds : get all the testRequireds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testRequireds in body
     */
    @GetMapping("/test-requireds")
    @Timed
    public List<TestRequiredDTO> getAllTestRequireds() {
        log.debug("REST request to get all TestRequireds");
        return testRequiredService.findAll();
        }

    /**
     * GET  /test-requireds/:id : get the "id" testRequired.
     *
     * @param id the id of the testRequiredDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testRequiredDTO, or with status 404 (Not Found)
     */
    @GetMapping("/test-requireds/{id}")
    @Timed
    public ResponseEntity<TestRequiredDTO> getTestRequired(@PathVariable Long id) {
        log.debug("REST request to get TestRequired : {}", id);
        TestRequiredDTO testRequiredDTO = testRequiredService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testRequiredDTO));
    }

    /**
     * DELETE  /test-requireds/:id : delete the "id" testRequired.
     *
     * @param id the id of the testRequiredDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-requireds/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestRequired(@PathVariable Long id) {
        log.debug("REST request to delete TestRequired : {}", id);
        testRequiredService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
