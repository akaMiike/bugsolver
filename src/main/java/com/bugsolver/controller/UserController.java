package com.bugsolver.controller;

import com.bugsolver.entity.Bug;
import com.bugsolver.entity.User;
import com.bugsolver.service.BugService;
import com.bugsolver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final BugService bugService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User newUser){
        User userCreated = userService.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/bugs")
    public ResponseEntity<Page<Bug>> getAllBugsFromUser(
            Pageable pageable,
            Principal principal){

        String username = principal.getName();
        User userLogged = userService.findByUsername(username);
        return ResponseEntity.ok(bugService.findBugsByUserId(pageable, userLogged.getId()));
    }
}
