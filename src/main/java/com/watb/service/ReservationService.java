package com.watb.service;

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
    public Long reservation(ReservationRequest request, String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).get();
        System.out.println("로그인 유저 => " + loginUser);
        Reservation saveReserve = reservationRepository.save(request.toEntity(loginUser));
        return saveReserve.getId();
    }
}
