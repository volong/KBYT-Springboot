package com.project.service.impl;

import com.project.model.Contact;
import com.project.repository.ContactRepository;
import com.project.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public Contact save(Contact contact) {
        contactRepository.save(contact);
        return contact;
    }

    @Override
    public List<Contact> findContactsByPersonId(@Param("id") Long id_person) {
        return contactRepository.findContactsByPersonId(id_person);
    }
}
