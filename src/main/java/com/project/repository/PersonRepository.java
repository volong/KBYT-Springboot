package com.project.repository;

import com.project.model.Interface.ISaticalPerson;
import com.project.model.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

@Component

public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {

    @Query(value = "SELECT * FROM person order by id_person desc limit 1;", nativeQuery = true)
    Person findPersonNew();

    @Query(value= "Select count(*) as count, date as date from person  WHERE person.date >= :startDate AND person.date <= :endDate group by date", nativeQuery=true)
    List<ISaticalPerson> countPersonByDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query(value="Select count(*) as count, date as date from person  WHERE person.date =:date group by date;",nativeQuery=true)
    ISaticalPerson countPersonByDate(@Param("date") Date date );

    @Query(value="select * from person where date =:date", nativeQuery=true)
    List<Person> findPersonByDate(@Param("date") Date date);

    @Query(value="SELECT * FROM symptom inner join listsymptom on symptom.id_symptom=listsymptom.id_symptom inner join person on symptom.id_person = person.id_person WHERE person.date >= :startDate AND person.date <= :endDate and listsymptom.id_symptom = :symptom", nativeQuery = true)
    List<Person> findListPersonBySymptom(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("symptom") Long id_symptom);

    @Query(value="SELECT * FROM contact inner join listcontact on contact.id_contact=listcontact.id_contact inner join person on contact.id_person = person.id_person WHERE person.date >= :startDate AND person.date <= :endDate and listcontact.id_contact = :contact", nativeQuery = true)
    List<Person> findListPersonByContact(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("contact") Long id_contact);


}
