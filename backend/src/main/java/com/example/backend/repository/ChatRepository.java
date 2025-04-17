package com.example.backend.repository;

import com.example.backend.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    Optional<Chat> findByUserOneIdAndUserTwoId(int userOneId, int userTwoId);
    List<Chat> findChatsByUserOneId(int userOneId);
    List<Chat> findChatsByUserTwoId(int userTwoId);
}