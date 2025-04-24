package com.example.backend.controller;

import com.example.backend.model.Message;
import com.example.backend.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.repository.MessageRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

//    @GetMapping("/chat/{chatId}/messages")
//    public List<Message> getMessages(@PathVariable int chatId) {
//        return messageRepository.getMessagesByChatId(chatId);
//    }
}