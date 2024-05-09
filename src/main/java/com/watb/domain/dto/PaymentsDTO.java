package com.watb.domain.dto;

import com.watb.domain.entity.Reservation;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentsDTO {
    private Long id;
    private Integer amount;
    private String status; // 결제 상태
    private String merchantUid; // 주문번호
    private String impUid; // 결제 고유 번호
    private String paidAt; // 결제 승인 시각
}
