package com.jouav.myapp.repository;

import com.jouav.myapp.domain.TestResult;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {

}
