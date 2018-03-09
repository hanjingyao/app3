package com.jouav.myapp.repository;

import com.jouav.myapp.domain.TestRecording;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestRecording entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestRecordingRepository extends JpaRepository<TestRecording, Long> {

}
