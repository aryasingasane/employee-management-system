package com.ems;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGeneratorTest {

    @Test
    public void generatePasswords() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("HASH_HR: " + encoder.encode("hr123"));
        System.out.println("HASH_EMP: " + encoder.encode("emp123"));
    }
}
