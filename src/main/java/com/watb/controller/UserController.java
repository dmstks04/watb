package com.watb.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.watb.domain.dto.UserJoinRequest;
import com.watb.domain.dto.UserLoginRequest;
import com.watb.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {

	private final UserService userService;

	@GetMapping("/join")
	public String joinPage(Model model) {
		model.addAttribute("footer", false);
		return "auth/join";
	}

	@PostMapping("/join")
	public String join(Model model, @Valid UserJoinRequest request, BindingResult bindingResult,
			RedirectAttributes redirectAttributes) {
		if (bindingResult.hasErrors()) {
			Map<String, String> errorMap = new HashMap<>();
			for (FieldError error : bindingResult.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
				System.out.println(error.getDefaultMessage());
			}

			for (String key : errorMap.keySet()) {
				redirectAttributes.addFlashAttribute("message", errorMap.get(key));
			}
			return "redirect:/auth/join";
		}

		String url = "redirect:/auth/";

		String validateMessage = userService.validateJoin(request);
		if (validateMessage != null) {
			redirectAttributes.addFlashAttribute("message", validateMessage);
			url += "join";
		} else {
			userService.join(request);
			url += "login";
		}
		return url;
	}

	@GetMapping("/login")
	public String loginPage(@RequestParam(value = "error", required = false) String error,
			@RequestParam(value = "exception", required = false) String exception,
			Model model) {
		model.addAttribute("footer", false);
		model.addAttribute("userLoginRequest", new UserLoginRequest());
		model.addAttribute("error", error);
		model.addAttribute("exception", exception);
		return "auth/login";
	}

	@GetMapping("/admin")
	public String adminPage() {
		return "admin";
	}

}
