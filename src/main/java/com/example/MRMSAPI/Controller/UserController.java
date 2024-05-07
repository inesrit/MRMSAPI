package com.example.MRMSAPI.Controller;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Service.UserService;
import com.example.MRMSAPI.Dto.LoginDTO;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.response.LoginResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/*
User or healthcare provider rest API controller
*/

@RestController
@CrossOrigin(origins = "https://appmrms-49191739e0bc.herokuapp.com", allowCredentials = "true")
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private HttpSession session;

    @Autowired
    HttpServletResponse response;


    @PostMapping(path = "/save")
    public String saveUser(@RequestBody User user)
    {
        String id = userService.addUser(user);
        return id;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO)
    {
        LoginResponse loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<String> logoutUser() {
        session.invalidate(); // Invalidate session upon logout
        Cookie cookieuser = new Cookie("user", null);
        cookieuser.setHttpOnly(true);
        cookieuser.setSecure(false);
        cookieuser.setMaxAge(0);
        response.addCookie(cookieuser);
        return ResponseEntity.ok("Logout Successful");
    }

    @GetMapping(path = "/current-user-id")
    public ResponseEntity<Integer> getCurrentUserId() {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser.getUserid());
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PutMapping(path = "/update")
    public ResponseEntity<String> updateUserDetails(@RequestBody User updatedUser) {
        int userid = updatedUser.getUserid();
        User user = userService.getUserDetailsById(userid);
        if (user != null) {
            userService.updateUserDetails(user, updatedUser);
            return ResponseEntity.ok("User details updated successfully");
        } else {
            return ResponseEntity.badRequest().body("User not logged in or unauthorized to perform this action");
        }
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<String> deleteUser(@RequestParam int userId) {
        User user = userService.getUserDetailsById(userId);
        if (user != null) {
            userService.deleteUser(user);
            session.invalidate();
            return ResponseEntity.ok("User details deleted successfully");

        } else {
            return ResponseEntity.badRequest().body("User not logged in or unauthorized to perform this action");
        }
    }


    @GetMapping(path = "/details")
    public ResponseEntity<User> getLoggedInUserDetails() {
        User loggedInUser = userService.getLoggedInUserDetails();
        return ResponseEntity.ok(loggedInUser);
    }

    @GetMapping(path = "/user-details")
    public ResponseEntity<User> getUserDetailsById(@RequestParam int userId) {
        User user = userService.getUserDetailsById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

}
