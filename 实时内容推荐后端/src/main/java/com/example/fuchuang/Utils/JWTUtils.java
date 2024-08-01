package com.example.fuchuang.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Map;

public class JWTUtils {

    private static String singKey = "fuchuang";

    private static Long expire = 43200000L;

    //生成JWT令牌
    public static String creatJWT(Map<String,Object> claims){

        String jwt = Jwts.builder()
                .addClaims(claims)
                .signWith(SignatureAlgorithm.HS256,singKey)
                .setExpiration(new Date(System.currentTimeMillis() + expire))
                .compact();
        return jwt;

    }

    //解析JWT
    public static Claims parseJWT(String jwt){

        Claims claims = Jwts.parser()
                .setSigningKey(singKey)
                .parseClaimsJws(jwt)
                .getBody();
        return claims;

    }

}
