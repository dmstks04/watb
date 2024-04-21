package com.watb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Reservation findByMerchantUid(String merchantUid);

    List<Reservation> findAllByUser(User user);
}
