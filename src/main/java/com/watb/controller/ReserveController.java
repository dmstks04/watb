package com.watb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/watb")
public class ReserveController {

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

	@GetMapping("/detail")
	public String detailPage() {
		return "reserveDetail";
	}

}
