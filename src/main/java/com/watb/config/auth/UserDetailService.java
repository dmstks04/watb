package com.watb.config.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.watb.domain.entity.User;
import com.watb.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
		User user = userRepository.findByLoginId(loginId)
				.orElseThrow(() -> {
					return new UsernameNotFoundException("해당 유저를 찾을 수 없습니다.");
				});

		return new UserDetail(user);
	}

}
