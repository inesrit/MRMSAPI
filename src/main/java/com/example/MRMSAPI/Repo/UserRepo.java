package com.example.MRMSAPI.Repo;

import com.example.MRMSAPI.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
User or healthcare provider Data JPA repository class
*/

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User> findOneByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
