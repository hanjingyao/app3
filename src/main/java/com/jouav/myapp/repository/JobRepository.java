package com.jouav.myapp.repository;

import com.jouav.myapp.domain.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Job entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    @Query("select distinct job from Job job left join fetch job.tasks")
    List<Job> findAllWithEagerRelationships();

    @Query("select job from Job job left join fetch job.tasks where job.id =:id")
    Job findOneWithEagerRelationships(@Param("id") Long id);
   /*
   * created by Hanjingyao 2018.3.7
   * */
    //@Query(value= "select * from job b where b.id =?1",nativeQuery = true)
    //此时可以不用写sql
    List<Job> findAllById(Long id);
}
