package com.example.cars.controller;

import com.example.cars.model.User;
import com.example.cars.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController()
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/search")
    public User getUserById(@RequestParam String userName) {
        User user = this.userService.findByUserName(userName).orElse(new User());
        user.setRoles(null);
        user.setPassword(null);
        return user;
    }
}
