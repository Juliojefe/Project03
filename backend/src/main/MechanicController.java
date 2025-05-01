package com.example.backend.controller;

import com.example.backend.model.Mechanic;
import com.example.backend.services.MechanicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MechanicController {

    @Autowired
    private MechanicService mechanicService;

    @GetMapping("/find-mechanics")
    public List<Mechanic> findMechanics(@RequestParam double lat, @RequestParam double lon, @RequestParam int radius) {
        return mechanicService.findNearby(lat, lon, radius);
    }
}
