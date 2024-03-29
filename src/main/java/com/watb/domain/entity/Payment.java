package com.watb.domain.entity;

import com.watb.domain.enum_class.PaymentStatus;

import groovy.transform.builder.Builder;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long price;
    private PaymentStatus status;
    private String merchantUid; // 결제 고유 번호

    @Builder
    public Payment(Long price, PaymentStatus status) {
        this.price = price;
        this.status = status;
    }

    public void changePaymentBySuccess(PaymentStatus status, String merchantUid) {
        this.status = status;
        this.merchantUid = merchantUid;
    }

}
