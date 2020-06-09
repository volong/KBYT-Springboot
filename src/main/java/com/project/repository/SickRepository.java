package com.project.repository;

import com.project.model.Sick;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface SickRepository extends PagingAndSortingRepository<Sick, Long> {
    @Query(value="SELECT * FROM sick INNER JOIN listsick ON sick.id_sick = listsick.id_sick WHERE id_person = :id",nativeQuery=true)
    List<Sick> findSicksByPersonId(@Param("id") Long id_person);
}

