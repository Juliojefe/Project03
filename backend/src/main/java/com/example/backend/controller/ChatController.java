package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.repository.ChatRepository;

import java.util.Optional;

@RestController
@RequestMapping("api/chat")
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;

}