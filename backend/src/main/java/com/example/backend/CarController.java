package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@AllArgsConstructor
@RestController
@RequestMapping("/api/car")
public class CarController {

    private final IdService idService;

    private final CarService carService;

    @GetMapping
    public List<Car> getAllCars() { return carService.getAllCars(); }

    @PostMapping
    public Car addCar(@RequestBody Car car) throws Exception { return carService.addCar(car.withId(idService.generateID())); }

}
