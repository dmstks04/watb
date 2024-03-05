package com.watb.domain.dto;

import java.time.LocalDateTime;

import com.watb.domain.entity.User;
import com.watb.domain.enum_class.UserRole;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserJoinRequest {

	private String loginId;
	private String password;
	private String passwordCheck;
	private String nickname;

	public User toEntity(String encodedPassword) {

		return User.builder()
				.loginId(this.loginId)
				.password(encodedPassword)
				.nickname(this.nickname)
				.createdAt(LocalDateTime.now())
				.role(UserRole.USER)
				.build();
	}
}
