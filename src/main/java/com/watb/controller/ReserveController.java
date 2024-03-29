package com.watb.controller;

import java.util.Map;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

	@GetMapping("/reserve/detail")
	public String detailPage() {
		return "reserveDetail";
	}

	// @PostMapping("/postData")
	// public ResponseEntity<String> receiveData(@RequestParam("paramName") String
	// paramValue) {
	// System.out.println("Received parameter value: " + paramValue);
	// return ResponseEntity.ok(paramValue);
	// }

	@ResponseBody
	@PostMapping("/postData")
	public void reserveData(@RequestBody Map<String, Object> sendData) {
		System.out.println(sendData.size());
		System.out.println("countBtnValue: " + sendData.get("countBtnValue"));
		System.out.println("timeBtnValue: " + sendData.get("timeBtnValue"));
		System.out.println("dateValue: " + sendData.get("dateValue"));
		System.out.println("monthValue: " + sendData.get("monthValue"));
		System.out.println("hourValue: " + sendData.get("hourValue"));
		System.out.println("optionInfo: " + sendData.get("optionInfo"));
		System.out.println("totalPrice: " + sendData.get("totalPrice"));

		// optionInfo는 아이템 테이블로 저장하기

	}

}
