package com.watb.domain.dto;

import java.time.LocalDateTime;

import org.hibernate.validator.constraints.Length;

import com.watb.domain.entity.User;
import com.watb.domain.enum_class.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserJoinRequest {
	@NotBlank(message = "아이디를 입력해주세요.")
	@Email(message = "이메일 형식이 올바르지 않습니다.")
	private String loginId;

	@NotBlank(message = "비밀번호를 입력해주세요.")
	private String password;

	@NotBlank(message = "비밀번호를 확인해주세요.")
	private String passwordCheck;

	@NotBlank(message = "닉네임을 입력해주세요.")
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
