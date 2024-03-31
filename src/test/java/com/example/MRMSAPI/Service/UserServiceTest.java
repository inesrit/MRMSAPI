package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Controller.UserController;
import com.example.MRMSAPI.Dto.LoginDTO;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Repo.UserRepo;
import com.example.MRMSAPI.response.LoginResponse;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserServiceTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Autowired
    private MockMvc mockMvc;

    @Mock
    MockHttpSession mockHttpSession;

    @Autowired
    private UserController userController;

    @Mock
    private HttpSession session;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void addUser_ValidUser_ReturnsUsername() {
        // Mocking
        User user = new User();
        user.setUsername("testUser");
        user.setEmail("test@example.com");
        user.setPassword("password");

        when(passwordEncoder.encode(user.getPassword())).thenReturn(user.getPassword());
        when(userRepo.save(any(User.class))).thenReturn(user);

        // Test
        String result = userService.addUser(user);

        // Assertion
        assertEquals(user.getUsername(), result);
    }

//    @Test
//    void loginUser_ValidCredentials_ReturnsLoginResponse() {
//        // Mocking
//        String email = "test@example.com";
//        String password = "password";
//        User user = new User();
//        user.setEmail(email);
//        user.setPassword(password);
//        when(userRepo.findByEmail(email)).thenReturn(user);
//        when(passwordEncoder.matches(password, user.getPassword())).thenReturn(true);
//
//        // Test
//        LoginDTO loginDTO = new LoginDTO();
//        loginDTO.setEmail(email);
//        loginDTO.setPassword(password);
//        LoginResponse loginResponse = userService.loginUser(loginDTO);
//
//        // Assertion
//        assertTrue(loginResponse.getStatus());
//        assertEquals("Login Successful", loginResponse.getMessage());
//    }


    @Test
    void loginUser_Failure() {
        // Mocking user data
        String email = "test@example.com";
        String password = "password";
        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setPassword(password);

        // Mocking repository behavior
        when(userRepo.findByEmail(email)).thenReturn(mockUser);
        when(passwordEncoder.matches(password, "wrongpassword")).thenReturn(false);

        // Calling the method under test with wrong password
        LoginDTO loginDTO = new LoginDTO(email, "wrongpassword");
        LoginResponse response = userService.loginUser(loginDTO);

        // Verifying the result
        assertFalse(response.getStatus());
        assertEquals("Password does not match", response.getMessage());

        // Calling the method under test with wrong email
        loginDTO.setEmail("wrongemail@example.com");
        response = userService.loginUser(loginDTO);

        // Verifying the result
        assertFalse(response.getStatus());
        assertEquals("Email does not exit", response.getMessage());
    }


    @Test
    void updateUserDetails_ValidUser_ReturnsVoid() {
        // Mocking
        User loggedInUser = new User();
        loggedInUser.setUsername("oldUsername");
        loggedInUser.setEmail("old@example.com");
        loggedInUser.setPassword("oldPassword");

        when(userRepo.findByEmail(anyString())).thenReturn(loggedInUser);

        // Test
        User updateUser = new User();
        updateUser.setUsername("newUsername");
        updateUser.setEmail("new@example.com");
        updateUser.setPassword("newPassword");
        userService.updateUserDetails(loggedInUser, updateUser);

        // Assertion
        assertEquals("newUsername", loggedInUser.getUsername());
        assertEquals("new@example.com", loggedInUser.getEmail());
        //assertEquals("newPassword", loggedInUser.getPassword());
    }


    @Test
    void deleteUser_ValidUser_ReturnsVoid() {
        // Mocking
        User loggedInUser = new User();
        loggedInUser.setUsername("testUser");
        loggedInUser.setEmail("test@example.com");
        loggedInUser.setPassword("password");

        // Test
        userService.deleteUser(loggedInUser);

        // Assertion
        verify(userRepo, times(1)).delete(loggedInUser);
    }

    @Test
    void getLoggedInUserDetails_UserLoggedIn_ReturnsUser() throws Exception {
        // Mocking a logged-in user
        User loggedInUser = new User();
        loggedInUser.setUsername("testUser");
        loggedInUser.setEmail("test@example.com");
        loggedInUser.setPassword("password");

        // Mock HttpSession
        mockHttpSession.setAttribute("loggedInUser", loggedInUser);
        //HttpSession httpSession = mock(HttpSession.class);
        when(mockHttpSession.getAttribute("loggedInUser")).thenReturn(loggedInUser);

        // Perform request
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/user/details").session(mockHttpSession))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value(loggedInUser.getUsername()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(loggedInUser.getEmail()));
    }


//    @Test
//    void getUserDetailsById_ValidUserId_ReturnsUser() {
//        // Mocking
//        int userId = 1;
//        User user = new User();
//        user.setUserid(userId);
//        user.setUsername("testUser");
//        user.setEmail("test@example.com");
//        user.setPassword("password");
//
//        // Test
//
//        User userDetailsResponse = userService.getUserDetailsById(userId);
//
//        // Assertion
////        assertEquals(HttpStatus.OK, userDetailsResponse.getStatusCode());
//        assertNotNull(userDetailsResponse);
////        assertEquals(user, userDetailsResponse.getBody());
//        assertEquals(user, userDetailsResponse);
//    }




}
