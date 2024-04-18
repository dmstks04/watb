package com.watb.domain.dto;

import com.watb.domain.entity.User;

import lombok.Data;

@Data
public class UserInfoRequest {
    private String loginId;
    private String nickname;

    public User toEntity() {
        return User.builder()
                .loginId(loginId)
                .nickname(nickname)
                .build();
    }
}
