package com.watb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.watb.domain.entity.Reservation;
import com.watb.domain.entity.User;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Reservation findByMerchantUid(String merchantUid);

    List<Reservation> findByUser(User loginUser);

    @Query("SELECT r FROM Reservation r JOIN FETCH r.user JOIN FETCH r.payments WHERE r.user.loginId = :loginId")
    List<Reservation> findAllWithUserAndPaymentsByLoginId(String loginId);
}
