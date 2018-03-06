package com.jouav.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jouav.myapp.service.ProcedureTableService;
import com.jouav.myapp.web.rest.errors.BadRequestAlertException;
import com.jouav.myapp.web.rest.util.HeaderUtil;
import com.jouav.myapp.service.dto.ProcedureTableDTO;
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
 * REST controller for managing ProcedureTable.
 */
@RestController
@RequestMapping("/api")
public class ProcedureTableResource {

    private final Logger log = LoggerFactory.getLogger(ProcedureTableResource.class);

    private static final String ENTITY_NAME = "procedureTable";

    private final ProcedureTableService procedureTableService;

    public ProcedureTableResource(ProcedureTableService procedureTableService) {
        this.procedureTableService = procedureTableService;
    }

    /**
     * POST  /procedure-tables : Create a new procedureTable.
     *
     * @param procedureTableDTO the procedureTableDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new procedureTableDTO, or with status 400 (Bad Request) if the procedureTable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/procedure-tables")
    @Timed
    public ResponseEntity<ProcedureTableDTO> createProcedureTable(@RequestBody ProcedureTableDTO procedureTableDTO) throws URISyntaxException {
        log.debug("REST request to save ProcedureTable : {}", procedureTableDTO);
        if (procedureTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new procedureTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProcedureTableDTO result = procedureTableService.save(procedureTableDTO);
        return ResponseEntity.created(new URI("/api/procedure-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /procedure-tables : Updates an existing procedureTable.
     *
     * @param procedureTableDTO the procedureTableDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated procedureTableDTO,
     * or with status 400 (Bad Request) if the procedureTableDTO is not valid,
     * or with status 500 (Internal Server Error) if the procedureTableDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/procedure-tables")
    @Timed
    public ResponseEntity<ProcedureTableDTO> updateProcedureTable(@RequestBody ProcedureTableDTO procedureTableDTO) throws URISyntaxException {
        log.debug("REST request to update ProcedureTable : {}", procedureTableDTO);
        if (procedureTableDTO.getId() == null) {
            return createProcedureTable(procedureTableDTO);
        }
        ProcedureTableDTO result = procedureTableService.save(procedureTableDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, procedureTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /procedure-tables : get all the procedureTables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of procedureTables in body
     */
    @GetMapping("/procedure-tables")
    @Timed
    public List<ProcedureTableDTO> getAllProcedureTables() {
        log.debug("REST request to get all ProcedureTables");
        return procedureTableService.findAll();
        }

    /**
     * GET  /procedure-tables/:id : get the "id" procedureTable.
     *
     * @param id the id of the procedureTableDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the procedureTableDTO, or with status 404 (Not Found)
     */
    @GetMapping("/procedure-tables/{id}")
    @Timed
    public ResponseEntity<ProcedureTableDTO> getProcedureTable(@PathVariable Long id) {
        log.debug("REST request to get ProcedureTable : {}", id);
        ProcedureTableDTO procedureTableDTO = procedureTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(procedureTableDTO));
    }

    /**
     * DELETE  /procedure-tables/:id : delete the "id" procedureTable.
     *
     * @param id the id of the procedureTableDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/procedure-tables/{id}")
    @Timed
    public ResponseEntity<Void> deleteProcedureTable(@PathVariable Long id) {
        log.debug("REST request to delete ProcedureTable : {}", id);
        procedureTableService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
