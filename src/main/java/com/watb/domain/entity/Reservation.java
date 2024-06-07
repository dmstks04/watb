package com.watb.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.watb.config.StringListConverter;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reservation", indexes = @Index(name = "reservation_idx", columnList = "reservation_date, reservation_time", unique = true))
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // 예약자
    private String merchantUid; // 주문번호
    private LocalDate reservationDate; // 예약일
    private Integer reservationTime; // 예약 시간
    private Integer usageTime; // 이용 시간
    private Integer guestCount; // 인원수
    private Integer amount; // 가격
    private LocalDateTime created; // 등록날짜
    @Convert(converter = StringListConverter.class) // JSON타입인 옵션을 리스트로 저장
    private List<Map<String, Integer>> optionInfo;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payments_id")
    private Payments payments;

}
