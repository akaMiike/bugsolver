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

    Page<Bug> findBugByTitleContainingIgnoreCase(Pageable pageable, String title);

    @Query(value = "SELECT b.* FROM Bugs as b JOIN Users as u ON b.user_id = u.id AND u.id = :idUser", nativeQuery = true)
    Page<Bug> findBugsByUserId(Pageable pageable, @Param("idUser") Long idUser);

    @Query(value = "SELECT b.* FROM Bugs as b " +
            "JOIN bug_category as bc ON bc.bug_id = b.id " +
            "JOIN Category as c ON c.id = bc.category_id and c.name IN :categories", nativeQuery = true)
    Page<Bug> findBugsByCategories(Pageable pageable, @Param("categories") Set<String> categories);

    @Query(value = "SELECT b FROM Bug b JOIN FETCH b.categories c " +
            "WHERE UPPER(b.title) LIKE UPPER(CONCAT('%',:title,'%')) and c.name IN :categories",
            countQuery = "SELECT count(b) FROM Bug b JOIN b.categories c " +
            "WHERE UPPER(b.title) LIKE UPPER(CONCAT('%',:title,'%')) and c.name IN :categories"
    )
    Page<Bug> findBugsByCategoriesAndTitle(Pageable pageable, @Param("categories") Set<String> categories, @Param("title") String title);

    @Query(value = "SELECT b from Bug b LEFT JOIN FETCH b.categories",
            countQuery = "SELECT count(b) from Bug b")
    Page<Bug> findAll(Pageable pageable);
}
