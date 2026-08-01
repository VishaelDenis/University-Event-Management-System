package com.eventmanagement.config;

import com.eventmanagement.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints - auth, pings, GET events
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/*/ping").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/bookings/**").permitAll()
                        // Admin only - user management (role promotion)
                        .requestMatchers("/api/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/venues/all").hasRole("ADMIN")
                        // Venue CRUD - organizers manage venues via OrganizerDashboard; admins can too
                        .requestMatchers(HttpMethod.POST, "/api/venues/**").hasAnyRole("ADMIN", "ORGANIZER")
                        .requestMatchers(HttpMethod.PUT, "/api/venues/**").hasAnyRole("ADMIN", "ORGANIZER")
                        .requestMatchers(HttpMethod.DELETE, "/api/venues/**").hasAnyRole("ADMIN", "ORGANIZER")
                        // Organizer endpoints - event CRUD only
                        .requestMatchers(HttpMethod.POST, "/api/events/**").hasRole("ORGANIZER")
                        .requestMatchers(HttpMethod.PUT, "/api/events/**").hasRole("ORGANIZER")
                        .requestMatchers(HttpMethod.DELETE, "/api/events/**").hasRole("ORGANIZER")
                        // Student endpoints - booking CRUD + feedback CRUD + help CRUD
                        .requestMatchers(HttpMethod.POST, "/api/bookings/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.PUT, "/api/bookings/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.DELETE, "/api/bookings/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.POST, "/api/feedback/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.PUT, "/api/feedback/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.DELETE, "/api/feedback/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.POST, "/api/help/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.PUT, "/api/help/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.DELETE, "/api/help/**").hasRole("STUDENT")
                        // Authenticated users can view venues
                        .requestMatchers(HttpMethod.GET, "/api/venues/**").authenticated()
                        // Any other request must be authenticated
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
