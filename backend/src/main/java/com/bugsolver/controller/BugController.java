package com.bugsolver.controller;

import com.bugsolver.entity.Bug;
import com.bugsolver.entity.User;
import com.bugsolver.service.BugService;
import com.bugsolver.service.UserService;
import com.bugsolver.util.BugSearchCriteria;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bug")
public class BugController {

    private final BugService bugService;
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<Page<Bug>> getAllBugsPaginated(Pageable pageable,
                                                         @RequestParam(required = false, defaultValue = "") Set<String> categories,
                                                         @RequestParam(required = false, defaultValue = "") String title
    ){
        BugSearchCriteria searchCriteria = BugSearchCriteria.builder()
                .title(title)
                .categories(categories)
                .build();

        return ResponseEntity.ok(bugService.findAll(pageable, searchCriteria));
    }

    @GetMapping("/user")
    public ResponseEntity<Page<Bug>> getAllBugsFromUserPaginated(
            Principal principal,
            Pageable pageable,
            @RequestParam(required = false, defaultValue = "") Set<String> categories,
            @RequestParam(required = false, defaultValue = "") String title
        ){

        String username = principal.getName();
        User userLogged = userService.findByUsername(username);

        BugSearchCriteria searchCriteria = BugSearchCriteria.builder()
                .userId(userLogged.getId())
                .title(title)
                .categories(categories)
                .build();

        return ResponseEntity.ok(bugService.findAll(pageable, searchCriteria));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bug> getBugById(@PathVariable("id") Long id){
        return ResponseEntity.ok(bugService.findById(id));
    }

    @PostMapping("")
    public ResponseEntity<Bug> createNewBug(
            Principal principal,
            @Valid @RequestBody Bug newBug){

        String username = principal.getName();
        User userLoggedIn = userService.findByUsername(username);

        newBug.setUser(userLoggedIn);
        Bug bugCreated = bugService.save(newBug);
        return ResponseEntity.status(HttpStatus.CREATED).body(bugCreated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBugById(@PathVariable("id") Long id){
        bugService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bug> updateBugById(@PathVariable("id") Long id,
                                             @Valid @RequestBody Bug bugUpdated){
        Bug updatedBug = bugService.update(id, bugUpdated);
        return ResponseEntity.ok(updatedBug);

    }
}
