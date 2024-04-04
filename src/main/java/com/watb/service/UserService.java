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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final BCryptPasswordEncoder encoder;

	// 회원가입
	public void join(UserJoinRequest request) {
		// if (!request.getPassword().equals(request.getPasswordCheck())) {
		//
		// }
		userRepository.save(request.toEntity(encoder.encode(request.getPassword())));
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

	public BindingResult joinValid(UserJoinRequest req, BindingResult bindingResult) {
		if (req.getLoginId().isEmpty()) {
			bindingResult.addError(new FieldError("req", "loginId", "아이디가 비어있습니다."));
		} else if (req.getLoginId().length() > 10) {
			bindingResult.addError(new FieldError("req", "loginId", "아이디가 10자가 넘습니다."));
		} else if (userRepository.existsByLoginId(req.getLoginId())) {
			bindingResult.addError(new FieldError("req", "loginId", "아이디가 중복됩니다."));
		}

		if (req.getPassword().isEmpty()) {
			bindingResult.addError(new FieldError("req", "password", "비밀번호가 비어있습니다."));
		}

		if (!req.getPassword().equals(req.getPasswordCheck())) {
			bindingResult.addError(new FieldError("req", "passwordCheck", "비밀번호가 일치하지 않습니다."));
		}

		return bindingResult;
	}
}
