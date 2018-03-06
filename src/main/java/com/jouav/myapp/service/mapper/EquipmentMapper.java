package com.jouav.myapp.service.mapper;

import com.jouav.myapp.domain.*;
import com.jouav.myapp.service.dto.EquipmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Equipment and its DTO EquipmentDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderTableMapper.class})
public interface EquipmentMapper extends EntityMapper<EquipmentDTO, Equipment> {

    @Mapping(source = "orderTable.id", target = "orderTableId")
    EquipmentDTO toDto(Equipment equipment);

    @Mapping(source = "orderTableId", target = "orderTable")
    Equipment toEntity(EquipmentDTO equipmentDTO);

    default Equipment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Equipment equipment = new Equipment();
        equipment.setId(id);
        return equipment;
    }
}
