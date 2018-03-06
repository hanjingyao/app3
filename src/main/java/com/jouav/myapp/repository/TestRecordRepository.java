package com.jouav.myapp.repository;

import com.jouav.myapp.domain.TestRecord;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestRecordRepository extends JpaRepository<TestRecord, Long> {

}
