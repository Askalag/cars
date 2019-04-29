package com.example.cars.controller;

import com.example.cars.model.Car;
import com.example.cars.model.User;
import com.example.cars.security.jwt.JwtProvider;
import com.example.cars.security.message.response.ResponseMessage;
import com.example.cars.service.CarService;
import com.example.cars.service.UserService;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController()
@RequestMapping(value = "/api/cars")
public class CarsController {

    @Autowired
    private CarService carService;

    @Autowired
    private JwtProvider jwtProvider;

    @GetMapping("/cars-board")
    @PreAuthorize("hasRole('JOKE') or hasRole('ADMIN')")
    public Iterable<Car> carsList() {
        return this.carService.getAll();
    }
    // -----------------new variant
    @PutMapping("/cars-board/add")
    @PreAuthorize("hasRole('JOKE') or hasRole('ADMIN')")
    public ResponseEntity<?> addCar(@RequestBody Car car, @RequestHeader(value = "Authorization") String barToken) {
        Car newCar = car;
        String token = barToken.replace("Bearer ", "");
        if (jwtProvider.validateJwtToken(token)) {
            newCar.setAddedBy(jwtProvider.getUserNameFromJwtToken(token));
            newCar.setDate(new Date());
            try {
                carService.addCar(newCar);
            } catch (DataIntegrityViolationException e) {
                return new ResponseEntity<>(new ResponseMessage("The car with vin number " + car.getVin() + " is already exist"), HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(new ResponseMessage("The car with vin number " + car.getVin() + " has been added"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ResponseMessage("Error "), HttpStatus.BAD_REQUEST);
    }
    //-------------------

    @GetMapping("/cars-board/view/{id}")
    public Car getCarById(@PathVariable Long id) {
        return this.carService.getById(id);
    }

    @DeleteMapping("/cars-board/delete")
    @PreAuthorize("hasRole('JOKE') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteCar(@RequestBody Car car) {
        Car delCar = car;
        try {
            this.carService.deleteCar(car);
            return new ResponseEntity<>(new ResponseMessage("The car with a vin " + car.getVin() + " has been deleted"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("The car with a vin " + car.getVin() + " has been deleted"), HttpStatus.BAD_REQUEST);
        }
    }

}
