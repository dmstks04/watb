package com.watb.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.watb.domain.dto.ReservationDTO;
import com.watb.domain.dto.ReservationRequest;
import com.watb.domain.dto.ReserveDateRequest;
import com.watb.service.ReservationService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class ReserveController {

	private final ReservationService reservationService;

	@GetMapping("/mypage")
	public String myPage(Model model) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String loginId = auth.getName();
		List<ReservationDTO> reservationDTOs = reservationService.getReservationById(loginId);
		model.addAttribute("reservations", reservationDTOs);
		return "mypage";
	}

	@GetMapping(value = { "", "/" })
	public String reservePage(Model model) {
		return "reserve";
	}

	@GetMapping("/detail")
	public String detailPage() {
		return "reserveDetail";
	}

	@PostMapping("/reserve/date")
	@ResponseBody
	public List<Integer> getReservationsByDate(@RequestBody ReserveDateRequest request) {
		List<Integer> clickDateTime = reservationService.getReservationsByDate(request);
		return clickDateTime;
	}

	@PostMapping("/reserve/{merchantUid}")
	@ResponseBody
	public ResponseEntity<Long> detailPage(@RequestBody ReservationRequest request,
			@PathVariable String merchantUid) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String loginId = auth.getName();
		Long reserveId = reservationService.reservation(request, loginId);
		return ResponseEntity.ok(reserveId);
	}

	@PostMapping("/reserve/cancel")
	@ResponseBody
	public int getReservationByMerchantUid(@RequestParam String id) {
		Long reserveId = Long.parseLong(id);
		int compare = reservationService.getReservationByMerchantUid(reserveId);
		return compare;
	}

	@PostMapping("/reserve/invalid")
	@ResponseBody
	public ResponseEntity<Void> removeInvalidReseravtion(@RequestParam String merchantUid) {
		System.out.println("merchantUid " + merchantUid);
		reservationService.removeReservation(merchantUid);
		return ResponseEntity.ok().build();
	}
}
