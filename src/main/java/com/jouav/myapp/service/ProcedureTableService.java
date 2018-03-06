package com.jouav.myapp.service;

import com.jouav.myapp.service.dto.ProcedureTableDTO;
import java.util.List;

/**
 * Service Interface for managing ProcedureTable.
 */
public interface ProcedureTableService {

    /**
     * Save a procedureTable.
     *
     * @param procedureTableDTO the entity to save
     * @return the persisted entity
     */
    ProcedureTableDTO save(ProcedureTableDTO procedureTableDTO);

    /**
     * Get all the procedureTables.
     *
     * @return the list of entities
     */
    List<ProcedureTableDTO> findAll();

    /**
     * Get the "id" procedureTable.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProcedureTableDTO findOne(Long id);

    /**
     * Delete the "id" procedureTable.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
