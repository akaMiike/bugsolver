package com.bugsolver.repository;

import com.bugsolver.entity.Bug;
import com.bugsolver.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface BugRepository extends JpaRepository<Bug, Long>, JpaSpecificationExecutor<Bug> {

    Page<Bug> findBugByTitleContainingIgnoreCase(Pageable pageable, String title);

    @Query(value = "SELECT b.* FROM Bugs as b JOIN Users as u ON b.user_id = u.id AND u.id = :idUser", nativeQuery = true)
    Page<Bug> findBugsByUserId(Pageable pageable, @Param("idUser") Long idUser);

    @Query(value = "SELECT b.* FROM Bugs as b " +
            "JOIN bug_category as bc ON bc.bug_id = b.id " +
            "JOIN Category as c ON c.id = bc.category_id and c.name IN :categories" +
            "GROUP BY b.id HAVING count(b.id) >= :numCategories", nativeQuery = true)
    Page<Bug> findBugsByCategories(Pageable pageable, @Param("categories") Set<String> categories, @Param("numCategories") Integer numCategories);

    @Query(value = "SELECT b.* FROM Bugs as b " +
            "JOIN bug_category as bc ON bc.bug_id = b.id " +
            "JOIN Category as c ON c.id = bc.category_id AND c.name IN :categories AND UPPER(b.title) LIKE UPPER(CONCAT('%',:title,'%'))" +
            "GROUP BY b.id HAVING count(b.id) >= :numCategories", nativeQuery = true
    )
    Page<Bug> findBugsByCategoriesAndTitle(Pageable pageable, @Param("title") String title, @Param("categories") Set<String> categories, @Param("numCategories") Integer numCategories);
}
