package com.project.service.impl;

import com.project.model.Symptom;
import com.project.repository.SymptomRepository;
import com.project.service.SymptomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class SymptomServiceImpl implements SymptomService {

    @Autowired
    private SymptomRepository symptomRepository;

    @Override
    public Symptom save(Symptom symptom) {
        symptomRepository.save(symptom);
        return symptom;
    }

    @Override
    public Symptom findById(Long id) {
        return symptomRepository.findById(id).get();
    }

    @Override
    public List<Symptom> findSymptomsByPersonId(@Param("id") Long id_person) {
        return symptomRepository.findSymptomsByPersonId(id_person);
    }

}
