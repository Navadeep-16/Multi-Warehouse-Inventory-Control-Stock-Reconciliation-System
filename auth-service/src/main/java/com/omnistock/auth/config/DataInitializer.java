package com.omnistock.auth.config;

import com.omnistock.auth.model.User;
import com.omnistock.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            seedUser(userRepository, passwordEncoder, "admin@nexora.io", "admin123", "ADMIN");
            seedUser(userRepository, passwordEncoder, "manager@nexora.io", "manager123", "MANAGER");
            seedUser(userRepository, passwordEncoder, "staff@nexora.io", "staff123", "STAFF");
            seedUser(userRepository, passwordEncoder, "customer@gmail.com", "customer123", "CUSTOMER");
        };
    }

    private void seedUser(UserRepository userRepository, PasswordEncoder passwordEncoder, String username, String password, String role) {
        if (userRepository.findByUsername(username).isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(role);
            userRepository.save(user);
            System.out.println("Seeded user: " + username + " with role: " + role);
        }
    }
}
