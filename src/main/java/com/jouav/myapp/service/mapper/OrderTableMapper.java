package com.jouav.myapp.service.mapper;

import com.jouav.myapp.domain.*;
import com.jouav.myapp.service.dto.OrderTableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderTable and its DTO OrderTableDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrderTableMapper extends EntityMapper<OrderTableDTO, OrderTable> {



    default OrderTable fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderTable orderTable = new OrderTable();
        orderTable.setId(id);
        return orderTable;
    }
}
