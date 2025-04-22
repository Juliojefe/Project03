package com.example.backend.controller;

import com.example.backend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
@RestController
@RequestMapping("api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;
}