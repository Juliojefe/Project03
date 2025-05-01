package com.example.backend.services;

import com.example.backend.model.Mechanic;
import com.example.backend.repository.MechanicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MechanicService {

    @Autowired
    private MechanicRepository mechanicRepository;

    public List<Mechanic> findNearby(double lat, double lon, double radius) {
        return mechanicRepository.findNearby(lat, lon, radius);
    }
}
