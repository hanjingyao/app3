package com.jouav.myapp.repository;

import com.jouav.myapp.domain.Equipment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Equipment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

}
