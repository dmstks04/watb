package com.watb.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReservationRequest {
    private LocalDate reservationDate; // 예약일
    private String usageTime; // 이용 시간
    private String guestCount; // 인원수
    private String price; // 가격
    private LocalDateTime created; // 등록날짜
    // private Payment payment;

    public Reservation toEntity(User user) {
        return Reservation.builder()
                .user(user)
                .reservationDate(reservationDate)
                .usageTime(usageTime)
                .guestCount(guestCount)
                .price(price)
                .created(LocalDateTime.now())
                .build();
    }
}
