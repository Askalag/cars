package com.example.cars.controller;

import com.example.cars.model.Car;
import com.example.cars.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class TestRestAPIs {

    @Autowired
    private CarService carService;

    @GetMapping("/api/test/free")
    public String free() {
        return ">>> free Contents!";
    }

    @GetMapping("/api/test/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String userAccess() {
        return ">>> User Contents!";
    }

    @GetMapping("/api/test/pm")
    @PreAuthorize("hasRole('PM') or hasRole('ADMIN')")
    public String projectManagementAccess() {
        return ">>> Project Management Board";
    }

    @GetMapping("/api/test/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return ">>> Admin Contents";
    }

    @GetMapping("/api/test/cars-board")
    @PreAuthorize("hasRole('JOKE') or hasRole('ADMIN')")
    public Iterable<Car> carsList() {
        return this.carService.getAll();
    }
}
