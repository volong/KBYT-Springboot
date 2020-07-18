package com.project.controller.web;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Date;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/chart")
    public String showDashboard() {
        return "/admin/chart";
    }


    @GetMapping("/table")
    public String table(){
        return "/admin/table";
    }

    @GetMapping("/personal/{id}")
    public ModelAndView showPerson(@PathVariable("id") Long id) {
        ModelAndView modelAndView = new ModelAndView("/admin/personal");
        modelAndView.addObject("id", id);
        return modelAndView;
    }


}
