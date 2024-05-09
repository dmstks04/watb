package com.watb.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.watb.domain.dto.PaymentsCancelRequest;
import com.watb.domain.dto.PaymentsRequest;
import com.watb.domain.entity.Payments;
import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;
import com.watb.repository.PaymentRepository;
import com.watb.repository.ReservationRepository;
import com.watb.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final IamportClient iamportClient;

    private Payments payments;

    // 결제 조회
    public IamportResponse<Payment> paymentResponse(PaymentsRequest paymentsRequest)
            throws IamportResponseException, IOException {
        IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(paymentsRequest.getImpUid());
        return iamportResponse;
    }

    // 결제 검증
    @Transactional
    public void verifyPayment(IamportResponse<Payment> iamportResponse, PaymentsRequest paymentsRequest)
            throws IOException {
        // 금액 비교
        if (iamportResponse.getResponse().getAmount().intValue() != paymentsRequest.getAmount())
            throw new IOException();
        // 유저 조회
        User user = userRepository.findPaymentsByLoginId(iamportResponse.getResponse().getBuyerEmail());
        // 1. 예약 내역 조회
        Reservation reservation = reservationRepository.findByMerchantUid(paymentsRequest.getMerchantUid());
        // 결제 금액 검증
        if (paymentsRequest.getAmount().equals(reservation.getAmount())) {
            // 2. 결제 내역 저장
            payments = paymentRepository.save(paymentsRequest.toEntity(user, reservation));
            reservation.setPayments(payments);
        }

    }

    public IamportResponse<Payment> removePayment(String impUid) throws IamportResponseException, IOException {
        IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(impUid);
        return iamportResponse;
    }

    // 결제 취소
    public IamportResponse<Payment> cancelPayment(PaymentsCancelRequest cancelRequest)
            throws IamportResponseException, IOException {
        IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(cancelRequest.getImpUid());
        CancelData cancelData = new CancelData(iamportResponse.getResponse().getImpUid(), true);
        IamportResponse<Payment> payment_response = iamportClient.cancelPaymentByImpUid(cancelData);

        if (payment_response.getCode() != 0) {
            System.out.println("getMessage : " + payment_response.getMessage());
        } else {
            System.out.println("getStatus " + payment_response.getResponse().getStatus());
            payments = paymentRepository.findByImpUid(cancelRequest.getImpUid());
            payments.setStatus(payment_response.getResponse().getStatus());
            paymentRepository.save(payments);
        }
        return payment_response;
    }

}
