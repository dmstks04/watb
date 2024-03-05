package com.watb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.watb.domain.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	boolean existsByLoginId(String loginId);

	boolean existsByNickname(String nickname);

	Optional<User> findByLoginId(String loginId);
}
