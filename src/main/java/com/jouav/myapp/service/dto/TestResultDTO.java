package com.jouav.myapp.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TestResult entity.
 */
public class TestResultDTO implements Serializable {

    private Long id;

    private String testResult;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestResult() {
        return testResult;
    }

    public void setTestResult(String testResult) {
        this.testResult = testResult;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TestResultDTO testResultDTO = (TestResultDTO) o;
        if(testResultDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testResultDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestResultDTO{" +
            "id=" + getId() +
            ", testResult='" + getTestResult() + "'" +
            "}";
    }
}
