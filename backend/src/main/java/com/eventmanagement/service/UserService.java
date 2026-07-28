package com.eventmanagement.service;

import com.eventmanagement.dto.request.RegisterRequest;
import com.eventmanagement.dto.response.UserResponse;
import com.eventmanagement.exception.BadRequestException;
import com.eventmanagement.exception.ResourceNotFoundException;
import com.eventmanagement.model.User;
import com.eventmanagement.repository.UserRepository;
import com.eventmanagement.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Set<String> VALID_ROLES =
            Set.of(RoleConstants.ADMIN, RoleConstants.ORGANIZER, RoleConstants.STUDENT);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registers a new user. Public self-registration always starts as STUDENT;
     * promotion to ORGANIZER/ADMIN happens later via updateRole (admin only).
     */
    public User register(RegisterRequest request) {
        if (request.getEmail() == null || request.getPassword() == null || request.getName() == null) {
            throw new BadRequestException("Name, email and password are required");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("An account with this email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(RoleConstants.STUDENT);

        return userRepository.save(user);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return toResponse(user);
    }

    public UserResponse updateRole(Long userId, String role) {
        String normalizedRole = role == null ? "" : role.trim().toUpperCase();
        if (!VALID_ROLES.contains(normalizedRole)) {
            throw new BadRequestException("Invalid role '" + role + "'. Must be one of " + VALID_ROLES);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setRole(normalizedRole);
        return toResponse(userRepository.save(user));
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        userRepository.delete(user);
    }

    public UserResponse toResponse(User user) {
        UserResponse response = new UserResponse();
        response.setUserId(user.getUserId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        return response;
    }
}
