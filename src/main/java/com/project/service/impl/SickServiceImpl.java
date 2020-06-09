package com.project.service.impl;

import com.project.model.Sick;
import com.project.repository.SickRepository;
import com.project.service.SickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SickServiceImpl implements SickService {

    @Autowired
    private SickRepository sickRepository;

    @Override
    public Sick save(Sick sick) {
        sickRepository.save(sick);
        return sick;
    }

    @Override
    public Sick findById(Long id) {
        return sickRepository.findById(id).get();
    }

    @Override
    public List<Sick> findSicksByPersonId(@Param("id") Long id_person) {
        return sickRepository.findSicksByPersonId(id_person);
    }
}
