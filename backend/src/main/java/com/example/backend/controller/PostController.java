package com.example.backend.controller;

import com.example.backend.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.repository.PostRepository;

import java.util.Optional;

@RestController
@RequestMapping("api/post")
public class PostController {

    @Autowired
    private PostService postService;
}