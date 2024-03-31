package com.example.MRMSAPI.Repo;

import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class UserRepoTest {

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void findOneByEmailAndPassword() {
        // Mocking
        String email = "test@example.com";
        String password = "password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        when(userRepo.findOneByEmailAndPassword(email, password)).thenReturn(Optional.of(user));

        // Test
        Optional<User> foundUser = userRepo.findOneByEmailAndPassword(email, password);

        // Assertion
        assertEquals(user, foundUser.orElse(null));
    }

    @Test
    void findByEmail() {
        // Mocking
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);
        when(userRepo.findByEmail(email)).thenReturn(user);

        // Test
        User foundUser = userRepo.findByEmail(email);

        // Assertion
        assertEquals(user, foundUser);
    }
}
