package com.watb.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReservationRequest {
    private String year;
    private String month;
    private String day;

    // private LocalDate reservationDate; // 예약일
    private Integer reservationTime;
    private Integer usageTime; // 이용 시간
    private Integer guestCount; // 인원수
    private Integer amount; // 가격
    private LocalDateTime created; // 등록날짜
    private String merchantUid;

    public Reservation toEntity(User user) {
        LocalDate reservationDate = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month),
                Integer.parseInt(day));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formattedDateTime = LocalDateTime.now().format(formatter);
        LocalDateTime dateTime = LocalDateTime.parse(formattedDateTime, formatter);

        return Reservation.builder()
                .user(user)
                .reservationDate(reservationDate)
                .reservationTime(reservationTime)
                .usageTime(usageTime)
                .guestCount(guestCount)
                .amount(amount)
                .merchantUid(merchantUid)
                .created(dateTime)
                .build();
    }
}
