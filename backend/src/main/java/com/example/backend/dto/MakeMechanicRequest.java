package com.example.backend.dto;

public class MakeMechanicRequest {
    private int userId;

    public MakeMechanicRequest(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
