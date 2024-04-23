package com.watb.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // 예약자
    private String merchantUid; // 주문번호
    private LocalDate reservationDate; // 예약일
    private String reservationTime; // 예약 시간
    private String usageTime; // 이용 시간
    private String guestCount; // 인원수
    private Integer amount; // 가격
    private LocalDateTime created; // 등록날짜
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payments_id")
    private Payments payments;

}
