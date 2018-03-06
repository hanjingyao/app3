package com.jouav.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ProcedureTable.
 */
@Entity
@Table(name = "procedure_table")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProcedureTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "procedure_table")
    private String procedureTable;

    @OneToOne
    @JoinColumn(unique = true)
    private OrderTable orderTable;

    @OneToMany(mappedBy = "procedureTable")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TestRequired> testRequireds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProcedureTable() {
        return procedureTable;
    }

    public ProcedureTable procedureTable(String procedureTable) {
        this.procedureTable = procedureTable;
        return this;
    }

    public void setProcedureTable(String procedureTable) {
        this.procedureTable = procedureTable;
    }

    public OrderTable getOrderTable() {
        return orderTable;
    }

    public ProcedureTable orderTable(OrderTable orderTable) {
        this.orderTable = orderTable;
        return this;
    }

    public void setOrderTable(OrderTable orderTable) {
        this.orderTable = orderTable;
    }

    public Set<TestRequired> getTestRequireds() {
        return testRequireds;
    }

    public ProcedureTable testRequireds(Set<TestRequired> testRequireds) {
        this.testRequireds = testRequireds;
        return this;
    }

    public ProcedureTable addTestRequired(TestRequired testRequired) {
        this.testRequireds.add(testRequired);
        testRequired.setProcedureTable(this);
        return this;
    }

    public ProcedureTable removeTestRequired(TestRequired testRequired) {
        this.testRequireds.remove(testRequired);
        testRequired.setProcedureTable(null);
        return this;
    }

    public void setTestRequireds(Set<TestRequired> testRequireds) {
        this.testRequireds = testRequireds;
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
        ProcedureTable procedureTable = (ProcedureTable) o;
        if (procedureTable.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), procedureTable.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProcedureTable{" +
            "id=" + getId() +
            ", procedureTable='" + getProcedureTable() + "'" +
            "}";
    }
}
