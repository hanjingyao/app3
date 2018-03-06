package com.jouav.myapp.service.mapper;

import com.jouav.myapp.domain.*;
import com.jouav.myapp.service.dto.ProcedureTableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProcedureTable and its DTO ProcedureTableDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderTableMapper.class})
public interface ProcedureTableMapper extends EntityMapper<ProcedureTableDTO, ProcedureTable> {

    @Mapping(source = "orderTable.id", target = "orderTableId")
    ProcedureTableDTO toDto(ProcedureTable procedureTable);

    @Mapping(source = "orderTableId", target = "orderTable")
    @Mapping(target = "testRequireds", ignore = true)
    ProcedureTable toEntity(ProcedureTableDTO procedureTableDTO);

    default ProcedureTable fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProcedureTable procedureTable = new ProcedureTable();
        procedureTable.setId(id);
        return procedureTable;
    }
}
