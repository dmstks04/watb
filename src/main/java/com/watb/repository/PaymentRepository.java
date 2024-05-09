package com.watb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watb.domain.entity.Payments;

public interface PaymentRepository extends JpaRepository<Payments, Long> {

    Payments findByImpUid(String impUid);
}
