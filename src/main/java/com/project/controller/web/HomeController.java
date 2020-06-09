package com.project.controller.web;

import com.project.model.Contact;
import com.project.model.Person;
import com.project.model.Sick;
import com.project.model.Symptom;
import com.project.repository.PersonRepository;
import com.project.service.*;
import com.project.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


@Controller
public class HomeController {
    @Autowired
    private PersonServiceImpl personServiceImpl;
    @Autowired
    private ProvinceServiceImpl provinceServiceImpl;
    @Autowired
    private DistrictServiceImpl districtServiceImpl;
    @Autowired
    private WardServiceImpl wardServiceImpl;

    @Autowired
    private SickServiceImpl sickServiceImpl;
    @Autowired
    private ContactServiceImpl contactServiceImpl;
    @Autowired
    private SymptomServiceImpl symptomServiceImpl;

    @Autowired
    private SickListServiceImpl sickListServiceImpl;
    @Autowired
    private ContactListServiceImpl contactListServiceImpl;
    @Autowired
    private SymptomListServiceImpl symptomListServiceImpl;



    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("person", new Person());
        model.addAttribute("sick", new Sick());
        model.addAttribute("contact", new Contact());
        model.addAttribute("symptom", new Symptom());
        model.addAttribute("provinces", provinceServiceImpl.findAll());
        model.addAttribute("districts", districtServiceImpl.findAll());
        model.addAttribute("wards", wardServiceImpl.findAll());
        return "home";
    }

    @PostMapping("/save")
    public String save(Model model, @RequestParam(name = "sick", required = false) Long[] sickId, @RequestParam(name = "contact", required = false) Long[] contactId,
                       @RequestParam(name = "symptom", required = false) Long[] symptomId, Person person, RedirectAttributes redirect) {

        Set<Contact> contactSet = new HashSet<>();
        Set<Sick> sickSet = new HashSet<>();
        Set<Symptom> symptomSet = new HashSet<>();
        person.setDate(Date.valueOf(LocalDate.now()));
        personServiceImpl.save(person);
        person = personServiceImpl.findPersonNew();



        if (contactId != null) {
            for (int i = 0; i < contactId.length; i++) {
                Contact contact = new Contact();
                contact.setListContact(contactListServiceImpl.findById(contactId[i]));
                contact.setPerson(person);
                 contactServiceImpl.save(contact);
            }
        }

        if (sickId != null) {
            for (int i = 0; i < sickId.length; i++) {
                Sick sick = new Sick();
                sick.setListSick(sickListServiceImpl.findById(sickId[i]));
                sick.setPerson(person);
                sickServiceImpl.save(sick);
            }
        }

        if (symptomId != null) {
            for (int i = 0; i < symptomId.length; i++) {
                Symptom symptom = new Symptom();
                symptom.setListSymptom(symptomListServiceImpl.findById(symptomId[i]));
                symptom.setPerson(person);
                symptomServiceImpl.save(symptom);
            }
        }

        redirect.addFlashAttribute("success", "Contacted");
        model.addAttribute("person", new Person());
        model.addAttribute("sick", new Sick());
        model.addAttribute("contact", new Contact());
        model.addAttribute("symptom", new Symptom());
        model.addAttribute("provinces", provinceServiceImpl.findAll());
        model.addAttribute("districts", districtServiceImpl.findAll());
        model.addAttribute("wards", wardServiceImpl.findAll());
        model.addAttribute("hello","hello");
        return "home";
    }
}
