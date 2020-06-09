package com.project.controller.web;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.sql.Date;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String showDashboard() {
        return "admin/dashboard";
    }

    @GetMapping("/table")
    public String showTable() {
        return "admin/table";
    }

    @GetMapping("/personal/{id}")
    public ModelAndView showPerson(@PathVariable("id") Long id) {

        ModelAndView modelAndView = new ModelAndView("admin/personal");
        modelAndView.addObject("id", id);
        return modelAndView;
    }

}
