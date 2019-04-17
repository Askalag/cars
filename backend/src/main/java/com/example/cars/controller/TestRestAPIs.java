package com.example.cars.controller;

import com.example.cars.model.Car;
import com.example.cars.model.User;
import com.example.cars.service.CarService;
import com.example.cars.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class TestRestAPIs {

    @Autowired
    private CarService carService;
    @Autowired
    private UserService userService;

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

    @GetMapping("api/test/cars-board/view/{id}")
    public Car getCarById(@PathVariable Long id) {
        return this.carService.getById(id);
    }

    @GetMapping("api/test/users/search")
    public User getCarById(@RequestParam String userName) {
        User user = this.userService.findByUserName(userName).orElse(new User());
        user.setRoles(null);
        user.setPassword(null);
        return user;
    }
}
