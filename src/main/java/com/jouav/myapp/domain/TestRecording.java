package com.jouav.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TestRecording.
 */
@Entity
@Table(name = "test_recording")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TestRecording implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_record")
    private String testRecord;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestRecord() {
        return testRecord;
    }

    public TestRecording testRecord(String testRecord) {
        this.testRecord = testRecord;
        return this;
    }

    public void setTestRecord(String testRecord) {
        this.testRecord = testRecord;
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
        TestRecording testRecording = (TestRecording) o;
        if (testRecording.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testRecording.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestRecording{" +
            "id=" + getId() +
            ", testRecord='" + getTestRecord() + "'" +
            "}";
    }
}
