package com.project.repository;

import com.project.model.Symptom;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component

public interface SymptomRepository extends PagingAndSortingRepository<Symptom, Long> {
    @Query(value="SELECT * FROM symptom INNER JOIN listsymptom ON symptom.id_symptom = listsymptom.id_symptom WHERE id_person = :id",nativeQuery=true)
    List<Symptom> findSymptomsByPersonId(@Param("id") Long id_person);
}
