package com.example.universityeventmanagement.repository;

import com.example.universityeventmanagement.model.Venue;  // ✅ ADD THIS IMPORT!
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {

    // Basic custom queries
    List<Venue> findByNameContainingIgnoreCase(String name);

    List<Venue> findByIsAvailableTrue();

    List<Venue> findByCapacityGreaterThanEqual(Integer minCapacity);

    List<Venue> findByLocationContainingIgnoreCase(String location);

    boolean existsByName(String name);

    Optional<Venue> findByName(String name);

    // Custom query with multiple filters
    @Query("SELECT v FROM Venue v WHERE " +
            "(:name IS NULL OR LOWER(v.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:minCapacity IS NULL OR v.capacity >= :minCapacity) AND " +
            "(:maxCapacity IS NULL OR v.capacity <= :maxCapacity) AND " +
            "(:location IS NULL OR LOWER(v.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:isAvailable IS NULL OR v.isAvailable = :isAvailable)")
    List<Venue> findVenuesWithFilters(
            @Param("name") String name,
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity,
            @Param("location") String location,
            @Param("isAvailable") Boolean isAvailable
    );

    // Find venues with capacity for event
    @Query("SELECT v FROM Venue v WHERE v.capacity >= :requiredCapacity AND v.isAvailable = true")
    List<Venue> findAvailableVenuesForEvent(@Param("requiredCapacity") Integer requiredCapacity);
}