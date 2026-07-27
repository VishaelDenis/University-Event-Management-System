-- schema.sql
CREATE DATABASE event_management;
USE event_management;

-- Users Table
CREATE TABLE users (
                       user_id INT PRIMARY KEY AUTO_INCREMENT,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password_hash VARCHAR(255) NOT NULL,
                       name VARCHAR(100) NOT NULL,
                       role ENUM('STUDENT', 'ORGANIZER', 'ADMIN') DEFAULT 'STUDENT',
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       is_active BOOLEAN DEFAULT TRUE
);

-- Venues Table
CREATE TABLE venues (
                        venue_id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(100) NOT NULL,
                        capacity INT NOT NULL,
                        location TEXT,
                        is_active BOOLEAN DEFAULT TRUE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
                        event_id INT PRIMARY KEY AUTO_INCREMENT,
                        venue_id INT NOT NULL,
                        organizer_id INT NOT NULL,
                        title VARCHAR(200) NOT NULL,
                        description TEXT,
                        event_date DATE NOT NULL,
                        event_time TIME NOT NULL,
                        capacity INT NOT NULL,
                        is_active BOOLEAN DEFAULT TRUE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        FOREIGN KEY (venue_id) REFERENCES venues(venue_id),
                        FOREIGN KEY (organizer_id) REFERENCES users(user_id)
);

-- Bookings Table
CREATE TABLE bookings (
                          booking_id INT PRIMARY KEY AUTO_INCREMENT,
                          event_id INT NOT NULL,
                          student_id INT NOT NULL,
                          participants_count INT DEFAULT 1,
                          booking_status ENUM('PENDING', 'CONFIRMED', 'CANCELLED') DEFAULT 'PENDING',
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (event_id) REFERENCES events(event_id),
                          FOREIGN KEY (student_id) REFERENCES users(user_id),
                          UNIQUE KEY unique_booking (event_id, student_id)
);

-- Feedback Table
CREATE TABLE feedback (
                          feedback_id INT PRIMARY KEY AUTO_INCREMENT,
                          student_id INT NOT NULL,
                          event_id INT,
                          rating INT CHECK (rating >= 1 AND rating <= 5),
                          content TEXT NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (student_id) REFERENCES users(user_id),
                          FOREIGN KEY (event_id) REFERENCES events(event_id)
);

-- Help Requests Table
CREATE TABLE help_requests (
                               help_id INT PRIMARY KEY AUTO_INCREMENT,
                               student_id INT NOT NULL,
                               event_id INT,
                               subject VARCHAR(200) NOT NULL,
                               message TEXT NOT NULL,
                               status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN',
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                               FOREIGN KEY (student_id) REFERENCES users(user_id),
                               FOREIGN KEY (event_id) REFERENCES events(event_id)
);

-- Indexes for better performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_event_organizer ON events(organizer_id);
CREATE INDEX idx_event_venue ON events(venue_id);
CREATE INDEX idx_event_date ON events(event_date);
CREATE INDEX idx_booking_student ON bookings(student_id);
CREATE INDEX idx_booking_event ON bookings(event_id);
CREATE INDEX idx_feedback_student ON feedback(student_id);
CREATE INDEX idx_help_student ON help_requests(student_id);