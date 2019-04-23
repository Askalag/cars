package com.example.cars.service;

import com.example.cars.model.Car;
import com.example.cars.repository.CarRepository;
import com.example.cars.security.UserDetailsServiceImpl;
import com.example.cars.security.UserPrinciple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepository;

    @Override
    public Iterable<Car> getAll() {
       return this.carRepository.findAll();
    }

    @Override
    public Car getById(Long id) {
        return this.carRepository.getCarById(id);
    }

    @Override
    public Car addCar(Car car) {
        Car newCar = car;
        return this.carRepository.saveAndFlush(car);
    }
}
