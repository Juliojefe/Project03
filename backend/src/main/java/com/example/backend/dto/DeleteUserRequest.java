package com.example.backend.dto;

public class DeleteUserRequest {
    private int userId;

    public DeleteUserRequest(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
