package com.watb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.watb.domain.dto.ReservationRequest;
import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;
import com.watb.repository.ReservationRepository;
import com.watb.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    @Transactional
    public String reservation(ReservationRequest request, String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).get();
        Reservation saveReserve = reservationRepository.save(request.toEntity(loginUser));
        return saveReserve.getMerchantUid();
    }

    @Transactional
    public Long updateReserve(ReservationRequest request, String merchantUid) {
        Reservation reservation = reservationRepository.save(request.toEntity(null));
        return reservation.getId();
    }

    public List<Reservation> getUserReservations(User user) {

        return reservationRepository.findAllByUser(user);
    }
}
