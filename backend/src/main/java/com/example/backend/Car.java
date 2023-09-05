package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@AllArgsConstructor
@NoArgsConstructor
@With
public class Car {

    private String id;

    private String brand;

    private String model;

    private String numberPlate;

    private int initialOdoReading;

    private int currentOdoReading;

    private String email;
}
