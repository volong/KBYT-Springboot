package com.project.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "contact")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_contact")
    private ListContact listContact;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_person")
    private Person person;

    public Contact() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id_contact) {
        this.id = id_contact;
    }

    public ListContact getListContact() {
        return listContact;
    }

    public void setListContact(ListContact listContact) {
        this.listContact = listContact;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
