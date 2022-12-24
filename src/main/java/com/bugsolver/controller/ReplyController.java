package com.bugsolver.controller;

import com.bugsolver.entity.Reply;
import com.bugsolver.entity.User;
import com.bugsolver.exception.user.NotBugAuthorException;
import com.bugsolver.service.ReplyService;
import com.bugsolver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reply")
public class ReplyController {

    private final ReplyService replyService;
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<Reply> getReplyById(@PathVariable("id") Long id){
        return ResponseEntity.ok(replyService.findById(id));
    }

    @PostMapping("")
    public ResponseEntity<Reply> createNewReply(Principal principal, @Valid @RequestBody Reply newReply){
        String username = principal.getName();
        User userLoggedIn = userService.findByUsername(username);

        newReply.setUser(userLoggedIn);
        Reply replyCreated = replyService.save(newReply);
        return ResponseEntity.status(HttpStatus.CREATED).body(replyCreated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateBestAnswer(Principal principal,
                                                 @RequestParam(value = "bestAnswer") Boolean bestAnswer,
                                                 @PathVariable("id") Long id){
        String username = principal.getName();

        Reply reply = replyService.findById(id);
        User bugAuthor = userService.findBugAuthorByReplyId(id);

        if(bugAuthor.getUsername().equals(username)){
            reply.setBest_answer(bestAnswer);
            replyService.update(id, reply);
        }
        else{
            throw new NotBugAuthorException();
        }

        return ResponseEntity.ok().build();
    }
}
