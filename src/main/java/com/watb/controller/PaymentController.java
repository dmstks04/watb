package com.watb.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.watb.domain.dto.PaymentsCancelRequest;
import com.watb.domain.dto.PaymentsRequest;
import com.watb.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @ResponseBody
    @PostMapping("/payment")
    public void payment(@RequestBody PaymentsRequest paymentsRequest)
            // PaymentsRequest paymentsRequest)
            throws IamportResponseException, IOException {
        // 결제 조회
        IamportResponse<Payment> iamportResponse = paymentService.paymentResponse(paymentsRequest);
        // 결제 검증
        paymentService.verifyPayment(iamportResponse, paymentsRequest);
    }

    @ResponseBody
    @PostMapping("/payment/remove")
    public IamportResponse<Payment> removePayment(@RequestParam String impUid)
            throws IamportResponseException, IOException {
        IamportResponse<Payment> iamportResponse = paymentService.removePayment(impUid);
        return iamportResponse;
    }

    @ResponseBody
    @PostMapping("/payment/cancel")
    public IamportResponse<Payment> cancelPayment(@RequestBody PaymentsCancelRequest cancelRequest)
            throws IamportResponseException, IOException {
        IamportResponse<Payment> cancelResponse = paymentService.cancelPayment(cancelRequest);
        return cancelResponse;
    }

}
