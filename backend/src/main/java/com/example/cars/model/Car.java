package com.example.cars.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "cars", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"vin"})
})
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String model;
    private String vin;
    private int year;
    @Column(name = "mileage")
    private int mileAge;
    @Column(name = "timeStamp")
    private Data timeStamp;
    private String addedBy;

}
