package com.jouav.myapp.service;

import com.jouav.myapp.service.dto.OrderTableDTO;
import java.util.List;

/**
 * Service Interface for managing OrderTable.
 */
public interface OrderTableService {

    /**
     * Save a orderTable.
     *
     * @param orderTableDTO the entity to save
     * @return the persisted entity
     */
    OrderTableDTO save(OrderTableDTO orderTableDTO);

    /**
     * Get all the orderTables.
     *
     * @return the list of entities
     */
    List<OrderTableDTO> findAll();

    /**
     * Get the "id" orderTable.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrderTableDTO findOne(Long id);

    /**
     * Delete the "id" orderTable.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
