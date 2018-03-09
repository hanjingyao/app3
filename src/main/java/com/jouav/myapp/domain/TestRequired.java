package com.jouav.myapp.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "test_required")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TestRequired implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_required_of_all")
    private String testRequiredOfAll;

    @OneToOne
    @JoinColumn(unique = true)
    private TestResult testResult;

    @ManyToOne
    private TestRecording testRecording;

    @ManyToOne
    private ProcedureTable procedureTable;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestRequiredOfAll() {
        return testRequiredOfAll;
    }

    public TestRequired testRequiredOfAll(String testRequiredOfAll) {
        this.testRequiredOfAll = testRequiredOfAll;
        return this;
    }

    public void setTestRequiredOfAll(String testRequiredOfAll) {
        this.testRequiredOfAll = testRequiredOfAll;
    }

    public TestResult getTestResult() {
        return testResult;
    }

    public TestRequired testResult(TestResult testResult) {
        this.testResult = testResult;
        return this;
    }

    public void setTestResult(TestResult testResult) {
        this.testResult = testResult;
    }

    public TestRecording getTestRecording() {
        return testRecording;
    }

    public TestRequired testRecording(TestRecording testRecording) {
        this.testRecording = testRecording;
        return this;
    }

    public void setTestRecording(TestRecording testRecording) {
        this.testRecording = testRecording;
    }

    public ProcedureTable getProcedureTable() {
        return procedureTable;
    }

    public TestRequired procedureTable(ProcedureTable procedureTable) {
        this.procedureTable = procedureTable;
        return this;
    }

    public void setProcedureTable(ProcedureTable procedureTable) {
        this.procedureTable = procedureTable;
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
        TestRequired testRequired = (TestRequired) o;
        if (testRequired.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testRequired.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestRequired{" +
            "id=" + getId() +
            ", testRequiredOfAll='" + getTestRequiredOfAll() + "'" +
            "}";
    }
}
