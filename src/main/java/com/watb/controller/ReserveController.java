package com.watb.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

import com.watb.domain.dto.ReservationDTO;
import com.watb.domain.dto.ReservationRequest;
import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;
import com.watb.service.ReservationService;
import com.watb.service.UserService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/watb")
public class ReserveController {

	private final ReservationService reservationService;
	private final UserService userService;

	@GetMapping("")
	public String home() {
		return "home";
	}

	@GetMapping("/mypage")
	public String myPage(Model model) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String loginId = auth.getName();
		// List<ReservationDTO> reservations =
		// reservationService.getReservations(loginId);
		List<Reservation> reservations = reservationService.getUserReservations(loginId);
		reservations.forEach(System.out::println);
		System.out.println(reservations.isEmpty());
		System.out.println(reservations.size());
		model.addAttribute("reservations", reservations);
		return "mypage";
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
