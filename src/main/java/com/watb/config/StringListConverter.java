package com.watb.config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Converter
public class StringListConverter implements AttributeConverter<List<Map<String, Integer>>, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Map<String, Integer>> dataList) {
        if (dataList == null) {
            throw new IllegalArgumentException("컨버터 에러 dataList is null");
        }
        try {
            return mapper.writeValueAsString(dataList);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Map<String, Integer>> convertToEntityAttribute(String data) {
        if (data == null) {
            throw new IllegalArgumentException("컨버터 에러 data is null");
        }
        try {
            return mapper.readValue(data, List.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}
