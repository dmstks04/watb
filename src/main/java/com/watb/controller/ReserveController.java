package com.watb.controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.watb.config.auth.UserDetail;
import com.watb.domain.dto.ReservationRequest;
import com.watb.domain.dto.UserInfoRequest;
import com.watb.repository.UserRepository;
import com.watb.service.ReservationService;
import com.watb.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@RequestMapping("/watb")
public class ReserveController {

	private final ReservationService reservationService;
	private final UserRepository userRepository;

	@GetMapping("/index")
	public String test() {
		return "index";
	}

	@GetMapping("")
	public String home() {
		return "home";
	}

	@GetMapping("/reserve")
	public String reserePage() {
		return "reserve";
	}

	@GetMapping("/reserve/detail")
	public String getMethodName() {
		return "reserveDetail";
	}

	// 1. 예약 저장
	@PostMapping("/reserve/{merchantUid}")
	@ResponseBody
	public void detailPage(@RequestBody ReservationRequest request, @PathVariable String merchantUid) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println(merchantUid);
		String loginId = auth.getName();
		reservationService.reservation(request, loginId);
	}

}
