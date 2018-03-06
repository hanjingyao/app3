package com.jouav.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jouav.myapp.service.OrderTableService;
import com.jouav.myapp.web.rest.errors.BadRequestAlertException;
import com.jouav.myapp.web.rest.util.HeaderUtil;
import com.jouav.myapp.service.dto.OrderTableDTO;
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
 * REST controller for managing OrderTable.
 */
@RestController
@RequestMapping("/api")
public class OrderTableResource {

    private final Logger log = LoggerFactory.getLogger(OrderTableResource.class);

    private static final String ENTITY_NAME = "orderTable";

    private final OrderTableService orderTableService;

    public OrderTableResource(OrderTableService orderTableService) {
        this.orderTableService = orderTableService;
    }

    /**
     * POST  /order-tables : Create a new orderTable.
     *
     * @param orderTableDTO the orderTableDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderTableDTO, or with status 400 (Bad Request) if the orderTable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-tables")
    @Timed
    public ResponseEntity<OrderTableDTO> createOrderTable(@RequestBody OrderTableDTO orderTableDTO) throws URISyntaxException {
        log.debug("REST request to save OrderTable : {}", orderTableDTO);
        if (orderTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderTableDTO result = orderTableService.save(orderTableDTO);
        return ResponseEntity.created(new URI("/api/order-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-tables : Updates an existing orderTable.
     *
     * @param orderTableDTO the orderTableDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderTableDTO,
     * or with status 400 (Bad Request) if the orderTableDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderTableDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-tables")
    @Timed
    public ResponseEntity<OrderTableDTO> updateOrderTable(@RequestBody OrderTableDTO orderTableDTO) throws URISyntaxException {
        log.debug("REST request to update OrderTable : {}", orderTableDTO);
        if (orderTableDTO.getId() == null) {
            return createOrderTable(orderTableDTO);
        }
        OrderTableDTO result = orderTableService.save(orderTableDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-tables : get all the orderTables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderTables in body
     */
    @GetMapping("/order-tables")
    @Timed
    public List<OrderTableDTO> getAllOrderTables() {
        log.debug("REST request to get all OrderTables");
        return orderTableService.findAll();
        }

    /**
     * GET  /order-tables/:id : get the "id" orderTable.
     *
     * @param id the id of the orderTableDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderTableDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-tables/{id}")
    @Timed
    public ResponseEntity<OrderTableDTO> getOrderTable(@PathVariable Long id) {
        log.debug("REST request to get OrderTable : {}", id);
        OrderTableDTO orderTableDTO = orderTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(orderTableDTO));
    }

    /**
     * DELETE  /order-tables/:id : delete the "id" orderTable.
     *
     * @param id the id of the orderTableDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-tables/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderTable(@PathVariable Long id) {
        log.debug("REST request to delete OrderTable : {}", id);
        orderTableService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
