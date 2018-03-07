package com.jouav.myapp.repository;

import com.jouav.myapp.domain.TestRequired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the TestRequired entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestRequiredRepository extends JpaRepository<TestRequired, Long> {
   // @Query(value = "select * from test_required WHERE id=?1", nativeQuery = true)
    List<TestRequired>  findAllById(Long id);

}
