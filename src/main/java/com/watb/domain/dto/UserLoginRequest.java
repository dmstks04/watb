package com.watb.domain.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginRequest {
	@NotBlank(message = "아이디를 입력해주세요.")
	private String loginId;
	@NotBlank(message = "비밀번호를 입력해주세요.")
	private String password;
}
