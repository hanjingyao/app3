package com.jouav.myapp.repository;

import com.jouav.myapp.domain.OrderTable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrderTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderTableRepository extends JpaRepository<OrderTable, Long> {

}
