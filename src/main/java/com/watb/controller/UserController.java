package com.watb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.watb.domain.dto.UserJoinRequest;
import com.watb.domain.dto.UserLoginRequest;
import com.watb.service.UserService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {

	private final UserService userService;

	@GetMapping("/join")
	public String joinPage() {
		return "auth/join";
	}

	@PostMapping("/join")
	public String join(Model model, UserJoinRequest request, BindingResult bindingResult) {
		if (userService.joinValid(request, bindingResult).hasErrors()) {
			return "auth/join";
		}
		userService.join(request);
		model.addAttribute("message", "회원가입에 성공하셨습니다");
		model.addAttribute("nextUrl", "auth/login");

		return "printMessage";
	}

	@GetMapping("/login")
	public String loginPage(@RequestParam(value = "error", required = false) String error,
			@RequestParam(value = "exception", required = false) String exception,
			Model model) {
		model.addAttribute("userLoginRequest", new UserLoginRequest());
		model.addAttribute("error", error);
		model.addAttribute("exception", exception);

		return "auth/login";
	}

}
