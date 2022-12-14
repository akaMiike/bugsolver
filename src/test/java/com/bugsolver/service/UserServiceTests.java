package com.bugsolver.service;

import com.bugsolver.entity.User;
import com.bugsolver.exception.user.UserNotFoundException;
import com.bugsolver.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@SpringBootTest
public class UserServiceTests {

    @Autowired
    private UserService userService;
    @MockBean
    private UserRepository userRepository;

    @Test
    @DisplayName("WHEN find user with valid id SHOULD return valid User")
    public void findUserByIdWithValidId(){
        User user = new User(
                1L,
                "mike.nss",
                "Michael Nicholas",
                "mike.nss@abc.com",
                "123456"
        );

        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        User returnedUser = userService.findById(user.getId());
        assertThat(returnedUser).isEqualTo(user);
    }

    @Test
    @DisplayName("WHEN find user with invalid id SHOULD return UserNotFoundException")
    public void findUserByIdWithInvalidId(){

        when(userRepository.findById(anyLong())).thenThrow(new UserNotFoundException());

        Assertions.assertThrows(UserNotFoundException.class,
                () -> userService.findById(1L)
        );

    }
}
