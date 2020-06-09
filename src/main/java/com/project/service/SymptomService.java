package com.project.service;

import com.project.model.Symptom;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SymptomService {
    Symptom save(Symptom symptom);

    Symptom findById(Long id);

    List<Symptom> findSymptomsByPersonId(@Param("id") Long id_person);
}
