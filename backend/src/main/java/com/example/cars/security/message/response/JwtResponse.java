package com.example.cars.security.message.response;

import java.util.Collection;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String userName;
    private Collection<? extends GrantedAuthority> authorities;

    public JwtResponse(String accessToken, String userName, Collection<? extends GrantedAuthority> authorities) {
        this.token = accessToken;
        this.userName = userName;
        this.authorities = authorities;
    }
}
