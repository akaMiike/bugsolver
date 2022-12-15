package com.bugsolver.auth.entity;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@Builder
public class RefreshTokenRequest {

    @NotBlank
    private String bearerToken;

    @NotBlank
    private String refreshToken;
}
