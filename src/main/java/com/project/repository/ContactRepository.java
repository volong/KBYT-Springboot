package com.project.repository;


import com.project.model.Contact;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ContactRepository extends PagingAndSortingRepository<Contact, Long> {
    @Query(value="SELECT * FROM contact INNER JOIN listcontact ON contact.id_contact = listcontact.id_contact WHERE id_person = :id",nativeQuery=true)
    List<Contact> findContactsByPersonId(@Param("id") Long id_person);

}
