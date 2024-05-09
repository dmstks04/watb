package com.watb.domain.dto;

import java.time.LocalDateTime;

import com.watb.domain.enum_class.UserRole;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private Long id;
    private String loginId;
}