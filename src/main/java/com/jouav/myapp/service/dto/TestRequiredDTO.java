package com.jouav.myapp.service.dto;



import java.io.Serializable;

import java.util.Objects;

/**
 * A DTO for the TestRequired entity.
 */

public class TestRequiredDTO implements Serializable {

    private Long id;

    private String testRequiredOfAll;

    private Long testResultId;

    private Long testRecordId;

    private Long procedureTableId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestRequiredOfAll() {
        return testRequiredOfAll;
    }

    public void setTestRequiredOfAll(String testRequiredOfAll) {
        this.testRequiredOfAll = testRequiredOfAll;
    }

    public Long getTestResultId() {
        return testResultId;
    }

    public void setTestResultId(Long testResultId) {
        this.testResultId = testResultId;
    }

    public Long getTestRecordId() {
        return testRecordId;
    }

    public void setTestRecordId(Long testRecordId) {
        this.testRecordId = testRecordId;
    }

    public Long getProcedureTableId() {
        return procedureTableId;
    }

    public void setProcedureTableId(Long procedureTableId) {
        this.procedureTableId = procedureTableId;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TestRequiredDTO testRequiredDTO = (TestRequiredDTO) o;
        if(testRequiredDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testRequiredDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestRequiredDTO{" +
            "id=" + getId() +
            ", testRequiredOfAll='" + getTestRequiredOfAll() + "'" +
            "}";
    }
}
