package com.jouav.myapp.repository;

import com.jouav.myapp.domain.TestRequired;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestRequired entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestRequiredRepository extends JpaRepository<TestRequired, Long> {

}
