package com.bugsolver.repository;

import com.bugsolver.entity.Bug;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BugRepository extends JpaRepository<Bug, Long> {

    @Query(value = "SELECT * FROM Bug JOIN User ON Bug.id_user = User.id AND User.id = :idUser", nativeQuery = true)
    Page<Bug> findBugsByUserId(Pageable pageable, @Param("idUser") Long idUser);
}
