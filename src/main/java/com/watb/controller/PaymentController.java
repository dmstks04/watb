package com.watb.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.watb.domain.dto.PaymentsRequest;
import com.watb.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @ResponseBody
    @PostMapping("/payment")
    public IamportResponse<Payment> payment(@RequestBody PaymentsRequest paymentsRequest)
            // PaymentsRequest paymentsRequest)
            throws IamportResponseException, IOException {
        // 결제 조회
        IamportResponse<Payment> iamportResponse = paymentService.paymentCallback(paymentsRequest);
        // 결제 검증
        paymentService.verifyPayment(iamportResponse, paymentsRequest);
        return iamportResponse;
    }

}
