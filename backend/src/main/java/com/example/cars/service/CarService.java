package com.example.cars.service;

import com.example.cars.model.Car;

import java.util.List;
import java.util.Optional;

public interface CarService {

    Iterable<Car> getAll();
    Car getById(Long id);
    Car addCar(Car car);
}
