package com.example.MRMSAPI.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception{
        RequestMatcher matcher = new AntPathRequestMatcher("/api/v1/**", HttpMethod.POST.toString());
        RequestMatcher matcher2 = new AntPathRequestMatcher("/api/v1/**", HttpMethod.GET.toString());
        RequestMatcher matcher3 = new AntPathRequestMatcher("/api/v1/**", HttpMethod.PUT.toString());
        RequestMatcher matcher4 = new AntPathRequestMatcher("/api/v1/**", HttpMethod.DELETE.toString());
        return http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(matcher).permitAll()
                        .requestMatchers(matcher3).permitAll()
                        .requestMatchers(matcher2).permitAll()
                        .requestMatchers(matcher4).permitAll()
                        .anyRequest().authenticated())
                .build();
    }
}