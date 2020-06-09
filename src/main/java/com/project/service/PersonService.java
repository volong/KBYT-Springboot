package com.project.service;

import com.project.model.Interface.ISaticalPerson;
import com.project.model.Person;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;


public interface PersonService {
    Person findById(Long id);

    void save(Person person);

    void remove(Long id);

    Iterable<Person> findAll();

    Person findPersonNew();

    List<ISaticalPerson> countPersonByDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    ISaticalPerson countPersonByDate(@Param("date") Date date );

    List<Person> findPersonByDate(@Param("date") Date date);

    List<Person> findListPersonBySymptom(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("symptom") Long id_symptom);

    List<Person> findListPersonByContact(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("symptom") Long id_contact);


}
