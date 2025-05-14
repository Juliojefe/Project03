package com.example.backend.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = false)
public class UserTypeConverter implements AttributeConverter<UserType, String> {

    @Override
    public String convertToDatabaseColumn(UserType userType) {
        return userType != null ? userType.getValue() : null;
    }

    @Override
    public UserType convertToEntityAttribute(String dbData) {
        return dbData != null ? UserType.fromValue(dbData) : null;
    }
}
