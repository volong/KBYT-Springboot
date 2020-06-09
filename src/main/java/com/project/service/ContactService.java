package com.project.service;

import com.project.model.Contact;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContactService {
    Contact save(Contact contact);


    List<Contact> findContactsByPersonId(@Param("id") Long id_person);
}
