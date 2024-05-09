package com.watb.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentsCancelRequest {
    private String impUid;
    private String merchantUid;
    private Integer amount;
}
