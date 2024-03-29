package com.watb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watb.domain.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
