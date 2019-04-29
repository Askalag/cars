package com.example.cars.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(value = "/api")
public class MainController {

    @GetMapping(value = "/")
    String getwlc() {
        return " hello from main contr";
    }
}
