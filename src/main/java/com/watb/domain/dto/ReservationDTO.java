package com.watb.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Long id;
    private String merchantUid;
    private LocalDate reservationDate;
    private Integer reservationTime;
    private Integer usageTime;
    private Integer guestCount;
    private Integer amount;
    private List<Map<String, Integer>> optionInfo;
    private LocalDateTime created;
    private UserDTO user;
    private PaymentsDTO payments;

    // public Reservation toEntity(User user, Payments payments) {
    // return Reservation.builder()
    // // .id(id)
    // .user(user)
    // .merchantUid(merchantUid)
    // .reservationDate(reservationDate)
    // .reservationTime(reservationTime)
    // .usageTime(usageTime)
    // .guestCount(guestCount)
    // .amount(amount)
    // .created(created)
    // .payments(payments)
    // .build();
    // }
}
