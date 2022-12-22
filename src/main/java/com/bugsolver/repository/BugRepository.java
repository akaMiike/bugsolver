package com.bugsolver.repository;

import com.bugsolver.entity.Bug;
import com.bugsolver.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface BugRepository extends JpaRepository<Bug, Long> {

    @Query(value = "SELECT * FROM Bugs JOIN User ON Bugs.id_user = User.id AND User.id = :idUser", nativeQuery = true)
    Page<Bug> findBugsByUserId(Pageable pageable, @Param("idUser") Long idUser);

    @Query(value = "SELECT b.* FROM Bugs as b " +
            "JOIN bug_category as bc ON bc.bug_id = b.id " +
            "JOIN Category as c ON c.id = bc.category_id and c.name IN :categories", nativeQuery = true)
    Page<Bug> findBugsByCategories(Pageable pageable, @Param("categories") Set<String> categories);
}
