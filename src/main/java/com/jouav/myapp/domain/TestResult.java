package com.jouav.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TestResult.
 */
@Entity
@Table(name = "test_result")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TestResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_result")
    private String testResult;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestResult() {
        return testResult;
    }

    public TestResult testResult(String testResult) {
        this.testResult = testResult;
        return this;
    }

    public void setTestResult(String testResult) {
        this.testResult = testResult;
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
        TestResult testResult = (TestResult) o;
        if (testResult.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testResult.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestResult{" +
            "id=" + getId() +
            ", testResult='" + getTestResult() + "'" +
            "}";
    }
}
