package com.jouav.myapp.service.impl;

import com.jouav.myapp.service.ProcedureTableService;
import com.jouav.myapp.domain.ProcedureTable;
import com.jouav.myapp.repository.ProcedureTableRepository;
import com.jouav.myapp.service.dto.ProcedureTableDTO;
import com.jouav.myapp.service.mapper.ProcedureTableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ProcedureTable.
 */
@Service
@Transactional
public class ProcedureTableServiceImpl implements ProcedureTableService {

    private final Logger log = LoggerFactory.getLogger(ProcedureTableServiceImpl.class);

    private final ProcedureTableRepository procedureTableRepository;

    private final ProcedureTableMapper procedureTableMapper;

    public ProcedureTableServiceImpl(ProcedureTableRepository procedureTableRepository, ProcedureTableMapper procedureTableMapper) {
        this.procedureTableRepository = procedureTableRepository;
        this.procedureTableMapper = procedureTableMapper;
    }

    /**
     * Save a procedureTable.
     *
     * @param procedureTableDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProcedureTableDTO save(ProcedureTableDTO procedureTableDTO) {
        log.debug("Request to save ProcedureTable : {}", procedureTableDTO);
        ProcedureTable procedureTable = procedureTableMapper.toEntity(procedureTableDTO);
        procedureTable = procedureTableRepository.save(procedureTable);
        return procedureTableMapper.toDto(procedureTable);
    }

    /**
     * Get all the procedureTables.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProcedureTableDTO> findAll() {
        log.debug("Request to get all ProcedureTables");
        return procedureTableRepository.findAll().stream()
            .map(procedureTableMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one procedureTable by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProcedureTableDTO findOne(Long id) {
        log.debug("Request to get ProcedureTable : {}", id);
        ProcedureTable procedureTable = procedureTableRepository.findOne(id);
        return procedureTableMapper.toDto(procedureTable);
    }

    /**
     * Delete the procedureTable by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProcedureTable : {}", id);
        procedureTableRepository.delete(id);
    }
}
