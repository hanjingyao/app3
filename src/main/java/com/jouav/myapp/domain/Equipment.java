package com.jouav.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Equipment.
 */
@Entity
@Table(name = "equipment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Equipment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "equipment")
    private String equipment;

    @OneToOne
    @JoinColumn(unique = true)
    private OrderTable orderTable;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEquipment() {
        return equipment;
    }

    public Equipment equipment(String equipment) {
        this.equipment = equipment;
        return this;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public OrderTable getOrderTable() {
        return orderTable;
    }

    public Equipment orderTable(OrderTable orderTable) {
        this.orderTable = orderTable;
        return this;
    }

    public void setOrderTable(OrderTable orderTable) {
        this.orderTable = orderTable;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Equipment equipment = (Equipment) o;
        if (equipment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), equipment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Equipment{" +
            "id=" + getId() +
            ", equipment='" + getEquipment() + "'" +
            "}";
    }
}
