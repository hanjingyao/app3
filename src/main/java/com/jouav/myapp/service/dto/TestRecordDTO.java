package com.jouav.myapp.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TestRecord entity.
 */
public class TestRecordDTO implements Serializable {

    private Long id;

    private String testRecord;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestRecord() {
        return testRecord;
    }

    public void setTestRecord(String testRecord) {
        this.testRecord = testRecord;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TestRecordDTO testRecordDTO = (TestRecordDTO) o;
        if(testRecordDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testRecordDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestRecordDTO{" +
            "id=" + getId() +
            ", testRecord='" + getTestRecord() + "'" +
            "}";
    }
}
