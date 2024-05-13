package com.watb.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.watb.domain.dto.PaymentsDTO;
import com.watb.domain.dto.ReservationDTO;
import com.watb.domain.dto.ReservationRequest;
import com.watb.domain.dto.ReserveDateRequest;
import com.watb.domain.dto.UserDTO;
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

    @Transactional
    public Long reservation(ReservationRequest request, String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).get();
        try {
            Reservation saveReserve = reservationRepository.save(request.toEntity(loginUser));
            return saveReserve.getId();
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("예약 중복입니다.");
        }
    }

    @Transactional
    public List<Integer> getReservationsByDate(ReserveDateRequest request) {
        LocalDate date = LocalDate.of(Integer.parseInt(request.getYear()),
                Integer.parseInt(request.getMonth()),
                Integer.parseInt(request.getDay()));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = date.format(formatter);
        LocalDate clickDate = LocalDate.parse(formattedDate, formatter);

        List<Reservation> reservationList = reservationRepository.findAllByReservationDate(clickDate);
        List<Integer> clickDateTime = new ArrayList<>();
        List<ReservationDTO> reservationDTOs = new ArrayList<>();
        for (Reservation reservation : reservationList) {
            User user = reservation.getUser();
            Payments payments = reservation.getPayments();

            PaymentsDTO paymentsDTO = PaymentsDTO.builder()
                    .id(payments.getId())
                    .status(payments.getStatus())
                    .build();
            UserDTO userDTO = UserDTO.builder()
                    .id(user.getId())
                    .build();

            ReservationDTO dto = ReservationDTO.builder()
                    .id(reservation.getId())
                    .user(userDTO)
                    .reservationDate(reservation.getReservationDate())
                    .reservationTime(reservation.getReservationTime())
                    .usageTime(reservation.getUsageTime())
                    .payments(paymentsDTO)
                    .build();
            reservationDTOs.add(dto);
        }

        for (ReservationDTO reservations : reservationDTOs) {
            if (reservations.getReservationDate().equals(clickDate) &&
                    reservations.getPayments().getStatus().equals("paid")) {
                clickDateTime.add(reservations.getReservationTime());
                if (reservations.getUsageTime() == 2) {
                    clickDateTime.add(reservations.getReservationTime() + 1);
                }
            }
        }

        return clickDateTime;
    }

    @Transactional
    public List<ReservationDTO> getReservationById(String loginId) {
        List<Reservation> reservationList = reservationRepository.findByUser_LoginIdOrderByIdDesc(loginId);
        List<ReservationDTO> reservationDTOs = new ArrayList<>();
        for (Reservation reservation : reservationList) {
            User user = reservation.getUser();
            Payments payments = reservation.getPayments();

            PaymentsDTO paymentsDTO = PaymentsDTO.builder()
                    .id(payments.getId())
                    .merchantUid(payments.getMerchantUid())
                    .impUid(payments.getImpUid())
                    .amount(payments.getAmount())
                    .status(payments.getStatus())
                    .paidAt(payments.getPaidAt())
                    .build();
            UserDTO userDTO = UserDTO.builder()
                    .id(user.getId())
                    .loginId(user.getLoginId())
                    .build();

            ReservationDTO dto = ReservationDTO.builder()
                    .id(reservation.getId())
                    .user(userDTO)
                    .merchantUid(reservation.getMerchantUid())
                    .reservationDate(reservation.getReservationDate())
                    .reservationTime(reservation.getReservationTime())
                    .usageTime(reservation.getUsageTime())
                    .amount(reservation.getAmount())
                    .created(reservation.getCreated())
                    .guestCount(reservation.getGuestCount())
                    .payments(paymentsDTO)
                    .build();
            reservationDTOs.add(dto);
        }
        return reservationDTOs;
    }

    @Transactional
    public int getReservationByMerchantUid(Long reserveId) {
        Optional<Reservation> reservation = reservationRepository.findById(reserveId);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String today = LocalDate.now().format(formatter);
        LocalDate todayDate = LocalDate.parse(today, formatter);

        LocalDate reserveDate = reservation.get().getReservationDate();
        int compare = reserveDate.compareTo(todayDate);

        System.out.println("오늘 날짜" + todayDate);
        System.out.println("예약 날짜" + reserveDate);
        System.out.println("compare == " + compare);

        return compare;
    }

    @Transactional
    public void removeReservation(String merchantUid) {
        Reservation reservation = reservationRepository.findByMerchantUid(merchantUid);
        reservationRepository.delete(reservation);
    }

}
