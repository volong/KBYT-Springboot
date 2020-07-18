package com.project.service.impl;

import com.project.model.Interface.ISaticalPerson;
import com.project.model.Person;
import com.project.repository.PersonRepository;
import com.project.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;


@Service
@Transactional
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository personRepository;


    @Override
    public Iterable<Person> findAll() {
        return personRepository.findAll();
    }

    @Override
    public void save(Person person) {
        personRepository.save(person);
    }

    @Override
    public void remove(Long id) {
        personRepository.deleteById(id);
    }

    @Override
    public Person findById(Long id) {
        return personRepository.findById(id).get();
    }

    @Override
    public Person findPersonNew() {
        return personRepository.findPersonNew();
    }

    @Override
    public List<ISaticalPerson> countPersonByDate(Date startDate, Date endDate) {
        return personRepository.countPersonByDate(startDate, endDate);
    }

    @Override
    public ISaticalPerson countPersonByDate(Date date) {
        return personRepository.countPersonByDate(date);
    }

    @Override
    public List<Person> findPersonByDate(Date date) {
        return personRepository.findPersonByDate(date);
    }

    @Override
    public List<Person> findListPersonBySymptom(Date startDate, Date endDate, Long id_symptom) {
        return personRepository.findListPersonBySymptom(startDate, endDate, id_symptom);
    }

    @Override
    public List<Person> findListPersonByContact(Date startDate, Date endDate, Long id_contact) {
        return personRepository.findListPersonByContact(startDate, endDate, id_contact);
    }

}
