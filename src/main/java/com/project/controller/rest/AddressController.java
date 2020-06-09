package com.project.controller.rest;


import com.project.model.District;
import com.project.model.Province;
import com.project.model.Ward;
import com.project.service.impl.DistrictServiceImpl;
import com.project.service.impl.ProvinceServiceImpl;
import com.project.service.impl.WardServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/json")
public class AddressController {
    @Autowired
    private ProvinceServiceImpl provinceServiceImpl;

    @Autowired
    private DistrictServiceImpl districtServiceImpl;

    @Autowired
    private WardServiceImpl wardServiceImpl;

     @GetMapping("/province")
    public List<Province> listProvince() {
        return provinceServiceImpl.findAll();
    }

    @GetMapping("/district/{id}")
         public List<District> listDistrict(@PathVariable("id")String id){

         return districtServiceImpl.findAllByProvince(provinceServiceImpl.findById(id).orElse(null));
        }


    @GetMapping("/ward/{id}")
    public List<Ward> listWard(@PathVariable("id") String id) {
         return wardServiceImpl.findAllByDistrict(districtServiceImpl.findById(id).orElse(null));
    }

}
