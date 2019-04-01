package com.example.cars.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

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

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private Date date;

    @Column(name = "added_by")
    private String addedBy;

}
