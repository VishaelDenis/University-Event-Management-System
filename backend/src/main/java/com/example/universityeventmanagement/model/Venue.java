package com.example.universityeventmanagement.model;

import javax.persistence.*;  // ✅ Use javax, not jakarta
import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "venues")
public class Venue {
    // ... rest of your code
}