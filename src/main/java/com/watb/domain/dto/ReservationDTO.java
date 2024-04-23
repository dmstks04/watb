package com.watb.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.watb.domain.entity.Payments;
import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    // private Long id;
    private String merchantUid;
    private LocalDate reservationDate;
    private String reservationTime;
    private String usageTime;
    private String guestCount;
    private Integer amount;
    private LocalDateTime created;
    private User user;
    private Payments payments;

    public Reservation toEntity(User user, Payments payments) {
        return Reservation.builder()
                // .id(id)
                .user(user)
                .merchantUid(merchantUid)
                .reservationDate(reservationDate)
                .reservationTime(reservationTime)
                .usageTime(usageTime)
                .guestCount(guestCount)
                .amount(amount)
                .created(created)
                .payments(payments)
                .build();
    }
}
