package com.jouav.myapp.service.impl;

import com.jouav.myapp.service.OrderTableService;
import com.jouav.myapp.domain.OrderTable;
import com.jouav.myapp.repository.OrderTableRepository;
import com.jouav.myapp.service.dto.OrderTableDTO;
import com.jouav.myapp.service.mapper.OrderTableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing OrderTable.
 */
@Service
@Transactional
public class OrderTableServiceImpl implements OrderTableService {

    private final Logger log = LoggerFactory.getLogger(OrderTableServiceImpl.class);

    private final OrderTableRepository orderTableRepository;

    private final OrderTableMapper orderTableMapper;

    public OrderTableServiceImpl(OrderTableRepository orderTableRepository, OrderTableMapper orderTableMapper) {
        this.orderTableRepository = orderTableRepository;
        this.orderTableMapper = orderTableMapper;
    }

    /**
     * Save a orderTable.
     *
     * @param orderTableDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderTableDTO save(OrderTableDTO orderTableDTO) {
        log.debug("Request to save OrderTable : {}", orderTableDTO);
        OrderTable orderTable = orderTableMapper.toEntity(orderTableDTO);
        orderTable = orderTableRepository.save(orderTable);
        return orderTableMapper.toDto(orderTable);
    }

    /**
     * Get all the orderTables.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderTableDTO> findAll() {
        log.debug("Request to get all OrderTables");
        return orderTableRepository.findAll().stream()
            .map(orderTableMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one orderTable by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrderTableDTO findOne(Long id) {
        log.debug("Request to get OrderTable : {}", id);
        OrderTable orderTable = orderTableRepository.findOne(id);
        return orderTableMapper.toDto(orderTable);
    }

    /**
     * Delete the orderTable by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderTable : {}", id);
        orderTableRepository.delete(id);
    }
}
