package com.example.backend.controller;

import com.example.backend.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/image")
public class ImageController {

    @Autowired
    private ImageService imageService;
}