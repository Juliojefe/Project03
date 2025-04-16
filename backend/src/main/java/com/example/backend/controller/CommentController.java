package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.repository.CommentRepository;

import java.util.Optional;
@RestController
@RequestMapping("api/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;
}