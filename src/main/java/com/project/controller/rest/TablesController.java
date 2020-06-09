package com.project.controller.rest;

import com.project.model.Person;
import com.project.service.impl.PersonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/json")
public class TablesController {


    @Autowired
    private PersonServiceImpl personServiceImpl;

    @GetMapping("/table")
    public List<Person> listPerson() {
        return (List<Person>) personServiceImpl.findAll();
    }

    @GetMapping(value = "personchart/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Person> findPersonByDate(@PathVariable("date") Date date){
        return personServiceImpl.findPersonByDate(date);
    }

    @GetMapping(value = "symptomtable/{startDate}/{endDate}/{symptom}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Person> findPersonBySymptom(@PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate, @PathVariable("symptom") Long id_symptom ){
        return personServiceImpl.findListPersonBySymptom(startDate, endDate, id_symptom);
    }

    @GetMapping(value = "contacttable/{startDate}/{endDate}/{contact}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Person> findPersonByContact(@PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate, @PathVariable("contact") Long id_contact ){
        return personServiceImpl.findListPersonByContact(startDate, endDate, id_contact);
    }



}
