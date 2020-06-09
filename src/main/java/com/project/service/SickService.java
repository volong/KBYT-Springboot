package com.project.service;

import com.project.model.Sick;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SickService {
    Sick save(Sick sick);

    Sick findById(Long id);

    List<Sick> findSicksByPersonId(@Param("id") Long id_person);
}
