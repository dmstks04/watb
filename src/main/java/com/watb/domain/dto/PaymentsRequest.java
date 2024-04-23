package com.watb.domain.dto;

import com.watb.domain.entity.Payments;
import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentsRequest {
    private String impUid;
    private String merchantUid;
    private Integer amount;
    private String status;
    private String paidAt;

    public Payments toEntity(User user, Reservation reservation) {
        return Payments.builder()
                .impUid(impUid)
                .merchantUid(merchantUid)
                .amount(amount)
                .user(user)
                .reservation(reservation)
                .status(status)
                .paidAt(paidAt)
                .build();
    }
}
