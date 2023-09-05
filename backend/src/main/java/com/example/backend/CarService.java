package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
@AllArgsConstructor
public class CarService {

    private final CarRepository carRepository;
    private final IdService idService;

    public List<Car> getAllCars()  {return carRepository.findAll();}

    public Car addCar(Car car) {
        return carRepository.save(car.withId(idService.generateID()));
    }

    public Car removeCar(String id) throws CarDoesNotExistException {
        boolean containsNotCar = !carRepository.existsById(id);

        if (containsNotCar) {
            throw new CarDoesNotExistException("Car does not exists");
        }

        carRepository.deleteById(id);
        return null;
    }

    public Car updateCar(String id, Car car) throws CarDoesNotExistException {
        boolean containsNotCar = !carRepository.existsById(id);
        if (containsNotCar) {
            throw new CarDoesNotExistException("Car does not exist");
        }
        return carRepository.save(car);
    }


}
