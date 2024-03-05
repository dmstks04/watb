package com.watb.config;

import java.util.stream.Stream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import com.watb.handler.UserLoginFailHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector introspector) {
        return new MvcRequestMatcher.Builder(introspector);
    }

    @Bean
    UserLoginFailHandler userLoginFailHandler() {
        return new UserLoginFailHandler();
    };

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http, MvcRequestMatcher.Builder mvc) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                mvc.pattern("/"),
                                mvc.pattern("/auth/**"),
                                mvc.pattern("/css/**"))
                        .permitAll()
                        .anyRequest().authenticated())

                .formLogin(login -> login
                        .loginPage("/auth/login").permitAll()
                        .usernameParameter("loginId")
                        .passwordParameter("password")
                        .defaultSuccessUrl("/")
                        .successHandler((req, resp, authentication) -> {
                            System.out.println("디버그 : 로그인이 완료되었습니다.");
                            resp.sendRedirect("/");
                        })
                        .failureHandler((req, resp, exception) -> {
                            System.out.println("디버그 : 로그인 실패 -> " + exception.getMessage());
                        })
                // .failureHandler(userLoginFailHandler())
                )

                .logout(logout -> logout
                        .logoutUrl("/auth/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"));

        return http.build();
    }

}
