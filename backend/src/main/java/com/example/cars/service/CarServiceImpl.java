package com.example.cars.service;

import com.example.cars.model.Car;
import com.example.cars.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}
