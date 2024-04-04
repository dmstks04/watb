package com.watb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watb.domain.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
