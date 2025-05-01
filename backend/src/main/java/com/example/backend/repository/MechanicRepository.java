package com.example.backend.repository;

import com.example.backend.model.Mechanic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MechanicRepository extends JpaRepository<Mechanic, Integer> {

    @Query(value = """
        SELECT * FROM mechanics
        WHERE 6371 * acos(
          cos(radians(:lat)) *
          cos(radians(lat)) *
          cos(radians(lon) - radians(:lon)) +
          sin(radians(:lat)) *
          sin(radians(lat))
        ) < :radius
        """, nativeQuery = true)
    List<Mechanic> findNearby(double lat, double lon, double radius);
}
