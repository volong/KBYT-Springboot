package com.project.repository;


import com.project.model.Role;
import org.springframework.data.repository.CrudRepository;


public interface RoleRepository extends CrudRepository<Role, Integer> {

    Role findByName(String name);

}
