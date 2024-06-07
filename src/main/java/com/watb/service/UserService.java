package com.watb.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import com.watb.domain.dto.UserJoinRequest;
import com.watb.domain.dto.UserLoginRequest;
import com.watb.domain.entity.User;
import com.watb.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final BCryptPasswordEncoder encoder;

	// 회원가입
	public void join(UserJoinRequest request) {
		userRepository.save(request.toEntity(encoder.encode(request.getPassword())));
		System.out.println("회원가입 - join 메서드");
	}

	// 회원가입 유효성 검사
	public String validateJoin(UserJoinRequest request) {
		String validateMessage = null;
		if (userRepository.existsByLoginId(request.getLoginId())) {
			validateMessage = "사용중인 이메일입니다.";
		} else if (!request.getPassword().equals(request.getPasswordCheck())) {
			validateMessage = "비밀번호가 일치하지 않습니다.";
		}
		return validateMessage;
	}

	// 로그인
	public User login(UserLoginRequest request) {
		Optional<User> optionalUser = userRepository.findByLoginId(request.getLoginId());
		if (optionalUser.isEmpty()) {
			return null;
		}
		User user = optionalUser.get();
		if (!user.getPassword().equals(request.getPassword())) {
			return null;
		}
		return user;
	}

}
