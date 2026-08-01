-- Plaintext password for the admin account is: admin@123
-- Plaintext password for the other seeded accounts is: password123
-- (hashed here with BCrypt since users.password_hash stores hashes, not
-- plaintext, and the backend's PasswordEncoder is BCryptPasswordEncoder)
DELETE FROM users WHERE email = 'admin@uni.lk';

INSERT INTO users (email, name, password_hash, role) VALUES
                                                    ('admin@university.edu', 'Admin User', '$2b$10$jv3GqAreIUEBsZv5SIs8x.dRVcykGT/P1IKFYHf68iNBNcF8zZhSG', 'ADMIN'),
                                                    ('organizer@uni.lk', 'Vishael Organizer', '$2b$10$Vzj0w0w.Emj2tQad8xVqwuKLz1SLg3I2Xxjvadez3VEEZqGvKFSAq', 'ORGANIZER'),
                                                    ('student@uni.lk', 'Sample Student', '$2b$10$8UJsF/aDmFpLXquWXxQiN.2J1AJeqOv/4c.lH/WZT2dK75wGERjF6', 'STUDENT');

INSERT INTO venues (name, capacity) VALUES
                                        ('Main Auditorium', 300),
                                        ('Seminar Hall A', 100);