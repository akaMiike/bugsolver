package com.bugsolver.service;

import com.bugsolver.entity.User;
import com.bugsolver.exception.user.AlreadyUsedEmailException;
import com.bugsolver.exception.user.AlreadyUsedUsernameException;
import com.bugsolver.exception.user.UserNotFoundException;
import com.bugsolver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User save(User user){
        if(userRepository.existsByEmail(user.getEmail())){
            throw new AlreadyUsedEmailException();
        }
        else if(userRepository.existsByUsername(user.getUsername())){
            throw new AlreadyUsedUsernameException();
        }
        return userRepository.save(user);
    }

    public User update(Long id, User user){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException();
        }
        else if(userRepository.existsByEmail(user.getEmail())){
            throw new AlreadyUsedEmailException();
        }
        else if(userRepository.existsByUsername(user.getUsername())){
            throw new AlreadyUsedUsernameException();
        }

        user.setId(id);
        return userRepository.save(user);
    }

    public void delete(User user){
        userRepository.delete(user);
    }

    public User findById(Long id){
        return userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException()
        );
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

}
