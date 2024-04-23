package com.watb.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.watb.domain.dto.ReservationDTO;
import com.watb.domain.dto.ReservationRequest;
import com.watb.domain.entity.Payments;
import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;
import com.watb.repository.PaymentRepository;
import com.watb.repository.ReservationRepository;
import com.watb.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    @Transactional
    public String reservation(ReservationRequest request, String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).get();
        Reservation saveReserve = reservationRepository.save(request.toEntity(loginUser));
        return saveReserve.getMerchantUid();
    }

    @Transactional
    public List<Reservation> getUserReservations(String loginId) {
        List<Reservation> reservations = reservationRepository.findAllWithUserAndPaymentsByLoginId(loginId);
        return reservations;
    }

    // @Transactional
    // public List<ReservationDTO> getReservations(String loginId) {
    // User loginUser = userRepository.findByLoginId(loginId).get();
    // List<Reservation> reservations = reservationRepository.findByUser(loginUser);

    // List<ReservationDTO> dtos = new ArrayList<>();
    // for (Reservation reserve : reservations) {
    // ReservationDTO buildDto = ReservationDTO.builder()
    // .amount(reserve.getAmount())
    // .created(reserve.getCreated())
    // .guestCount(reserve.getGuestCount())
    // .merchantUid(reserve.getMerchantUid())
    // .reservationDate(reserve.getReservationDate())
    // .reservationTime(reserve.getReservationTime())
    // .usageTime(reserve.getUsageTime())
    // .user(reserve.getUser())
    // .payments(reserve.getPayments())
    // .build();
    // dtos.add(buildDto);
    // }

    // return dtos;
    // }

}
