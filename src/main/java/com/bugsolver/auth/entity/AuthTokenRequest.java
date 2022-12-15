package com.bugsolver.auth.entity;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AuthTokenRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
