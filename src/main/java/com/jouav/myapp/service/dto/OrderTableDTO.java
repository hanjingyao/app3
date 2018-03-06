package com.jouav.myapp.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the OrderTable entity.
 */
public class OrderTableDTO implements Serializable {

    private Long id;

    private String rank;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderTableDTO orderTableDTO = (OrderTableDTO) o;
        if(orderTableDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderTableDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderTableDTO{" +
            "id=" + getId() +
            ", rank='" + getRank() + "'" +
            "}";
    }
}
