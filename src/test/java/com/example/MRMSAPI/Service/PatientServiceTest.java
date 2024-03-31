package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Controller.PatientController;
import com.example.MRMSAPI.Dto.LoginDTO;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Repo.PatientRepo;
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
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
class PatientServiceTest {

    @Mock
    private PatientRepo patientRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private PatientService patientService;

    @Autowired
    private MockMvc mockMvc;

    @Mock
    MockHttpSession mockHttpSession;

    @Autowired
    private PatientController patientController;

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
    void addPatient_ValidPatient_ReturnsUsername() {
        // Mocking
        Patient patient = new Patient();
        patient.setPatientName("testUser");
        patient.setEmail("test@example.com");
        patient.setPassword("password");

        when(passwordEncoder.encode(patient.getPassword())).thenReturn(patient.getPassword());
        when(patientRepo.save(any(Patient.class))).thenReturn(patient);

        // Test
        String result = patientService.addPatient(patient);

        // Assertion
        assertEquals(patient.getPatientName(), result);
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
    void loginPatient_Failure() {
        // Mocking patient data
        String email = "test@example.com";
        String password = "password";
        Patient mockPatient = new Patient();
        mockPatient.setEmail(email);
        mockPatient.setPassword(password);

        // Mocking repository behavior
        when(patientRepo.findByEmail(email)).thenReturn(mockPatient);
        when(passwordEncoder.matches(password, "wrongpassword")).thenReturn(false);

        // Calling the method under test with wrong password
        LoginDTO loginDTO = new LoginDTO(email, "wrongpassword");
        LoginResponse response = patientService.loginPatient(loginDTO);

        // Verifying the result
        assertFalse(response.getStatus());
        assertEquals("Password does not match", response.getMessage());

        // Calling the method under test with wrong email
        loginDTO.setEmail("wrongemail@example.com");
        response = patientService.loginPatient(loginDTO);

        // Verifying the result
        assertFalse(response.getStatus());
        assertEquals("Email does not exit", response.getMessage());
    }


    @Test
    void updatePatientDetails_ValidPatient_ReturnsVoid() {
        // Mocking
        Patient loggedInPatient = new Patient();
        loggedInPatient.setPatientName("oldUsername");
        loggedInPatient.setEmail("old@example.com");
        loggedInPatient.setPassword("oldPassword");

        when(patientRepo.findByEmail(anyString())).thenReturn(loggedInPatient);

        // Test
        Patient updatedPatient = new Patient();
        updatedPatient.setPatientName("newUsername");
        updatedPatient.setEmail("new@example.com");
        updatedPatient.setPassword("newPassword");
        patientService.updatePatientDetails(loggedInPatient, updatedPatient);

        // Assertion
        assertEquals("newUsername", loggedInPatient.getPatientName());
        assertEquals("new@example.com", loggedInPatient.getEmail());
        //assertEquals("newPassword", loggedInPatient.getPassword());
    }


    @Test
    void deletePatient_ValidPatient_ReturnsVoid() {
        // Mocking
        Patient loggedInPatient = new Patient();
        loggedInPatient.setPatientName("oldUsername");
        loggedInPatient.setEmail("old@example.com");
        loggedInPatient.setPassword("oldPassword");

        // Test
        patientService.deletePatient(loggedInPatient);

        // Assertion
        verify(patientRepo, times(1)).delete(loggedInPatient);
    }

    @Test
    void getLoggedInPatientDetails_PatientLoggedIn_ReturnsPatient() throws Exception {
        // Mocking a logged-in patient
        Patient loggedInPatient = new Patient();
        loggedInPatient.setPatientName("oldUsername");
        loggedInPatient.setEmail("old@example.com");
        loggedInPatient.setPassword("oldPassword");

        // Mock HttpSession
        mockHttpSession.setAttribute("loggedInPatient", loggedInPatient);
        //HttpSession httpSession = mock(HttpSession.class);
        when(mockHttpSession.getAttribute("loggedInPatient")).thenReturn(loggedInPatient);

        // Perform request
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/patient/details").session(mockHttpSession))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.patientName").value(loggedInPatient.getPatientName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(loggedInPatient.getEmail()));
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
//        ResponseEntity<User> userDetailsResponse = UserController.getUserDetailsById(userId);
//
//        // Assertion
//        assertEquals(HttpStatus.OK, userDetailsResponse.getStatusCode());
//        assertNotNull(userDetailsResponse.getBody());
//        assertEquals(user, userDetailsResponse.getBody());
//    }



}