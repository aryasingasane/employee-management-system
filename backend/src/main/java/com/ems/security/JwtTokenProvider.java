//package com.ems.security;
//
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Component;
//import java.security.Key;
//import java.util.Date;
//
//@Component
//public class JwtTokenProvider {
//    
//    @Value("${jwt.secret}")
//    private String jwtSecret;
//    
//    @Value("${jwt.expiration}")
//    private long jwtExpiration;
//    
//    private Key getSigningKey() {
//        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
//    }
//    
//    public String generateToken(String email, Long userId, String role) {
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + jwtExpiration);
//        
//        return Jwts.builder()
//                .setSubject(email)
//                .claim("userId", userId)
//                .claim("role", role)
//                .setIssuedAt(now)
//                .setExpiration(expiryDate)
//                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
//                .compact();
//    }
//    
//    public String getEmailFromToken(String token) {
//        Claims claims = Jwts.builder()
//                .setSigningKey(getSigningKey())
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//        return claims.getSubject();
//    }
//    
//    public Long getUserIdFromToken(String token) {
//        Claims claims = Jwts.builder()
//                .setSigningKey(getSigningKey())
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//        return claims.get("userId", Long.class);
//    }
//    
//    public boolean validateToken(String token) {
//        try {
//            Jwts.builder()
//                    .setSigningKey(getSigningKey())
//                    .build()
//                    .parseClaimsJws(token);
//            return true;
//        } catch (JwtException | IllegalArgumentException e) {
//            return false;
//        }
//    }
//}
