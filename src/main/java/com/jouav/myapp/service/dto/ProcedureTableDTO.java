package com.jouav.myapp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ProcedureTable entity.
 */
public class ProcedureTableDTO implements Serializable {

    private Long id;

    private String procedureTable;

    private Long orderTableId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProcedureTable() {
        return procedureTable;
    }

    public void setProcedureTable(String procedureTable) {
        this.procedureTable = procedureTable;
    }

    public Long getOrderTableId() {
        return orderTableId;
    }

    public void setOrderTableId(Long orderTableId) {
        this.orderTableId = orderTableId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProcedureTableDTO procedureTableDTO = (ProcedureTableDTO) o;
        if(procedureTableDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), procedureTableDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProcedureTableDTO{" +
            "id=" + getId() +
            ", procedureTable='" + getProcedureTable() + "'" +
            "}";
    }
}
