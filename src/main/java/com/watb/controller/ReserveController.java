package com.watb.controller;

import java.util.Map;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.watb.domain.dto.ReservationRequest;
import com.watb.domain.entity.Reservation;
import com.watb.service.ReservationService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
@RequestMapping("/watb")
public class ReserveController {

	private final ReservationService reservationService;

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
	public String detailPage(Model model) {
		model.addAttribute("reservationRequest", new ReservationRequest());
		return "reserveDetail";
	}

	@PostMapping("/postData")
	public String createReservation(@RequestBody Map<String, Object> sendData, Authentication auth,
			@ModelAttribute ReservationRequest request) {
		System.out.println(auth.getName());
		String usageTime = (String) sendData.get("reservationTime"); // 이용 시간
		String guestCount = (String) sendData.get("guestCount"); // 인원수
		String price = String.valueOf(sendData.get("price")); // 가격

		int year = Integer.parseInt(sendData.get("reservationYear").toString());
		int month = Integer.parseInt(sendData.get("reservationMonth").toString());
		int day = Integer.parseInt(sendData.get("reservationDate").toString());
		LocalDate date = LocalDate.of(year, month, day);

		request.setReservationDate(date);
		request.setUsageTime(usageTime);
		request.setGuestCount(guestCount);
		request.setPrice(price);

		Long reservationId = reservationService.reservation(request, auth.getName());
		System.out.println(reservationId);
		return "redirect:/";
	}
}
