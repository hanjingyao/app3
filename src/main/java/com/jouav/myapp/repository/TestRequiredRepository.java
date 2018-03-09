package com.jouav.myapp.repository;

import com.jouav.myapp.domain.TestRequired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Spring Data JPA repository for the TestRequired entity.
 */
@SuppressWarnings("unused")
@Repository
@Transactional(readOnly = true)//created by Hanjingyao
public interface TestRequiredRepository extends JpaRepository<TestRequired, Long> {
    /*
    * created by Hanjingyao 2018.3.7
    * */
   // @Query(value = "select * from test_required WHERE id=?1", nativeQuery = true)
    List<TestRequired>  findAllById(Long id);
    @Modifying
    @Transactional
    //@Query("delete from TestRequired r where r.id = ?1")

    void deleteTestRequiredById(Long id);
    //更新的方法
    @Modifying
    @Query("update TestRequired t set t.testRequiredOfAll = ?1 where t.id = ?2")
    void updateTestRequiredDTO(String testRequiredOfAll,Long id);
    //增加的方法
    @Modifying
    @Query(value = "insert into  test_required (id,test_required_of_all)  VALUES (?1,?2)",nativeQuery = true)
    void addNew(Long id, String testRequiredOfAll);

}
