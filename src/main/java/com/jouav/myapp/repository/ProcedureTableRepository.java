package com.jouav.myapp.repository;

import com.jouav.myapp.domain.ProcedureTable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProcedureTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcedureTableRepository extends JpaRepository<ProcedureTable, Long> {

}
