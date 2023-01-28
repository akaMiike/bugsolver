package com.bugsolver.repository;

import com.bugsolver.entity.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    @Query(value = "SELECT r.* FROM Reply as r " +
            "JOIN Bugs as b ON b.id = r.bug_id AND b.id = :bugId", nativeQuery = true)
    Page<Reply> findAllByBugId(Pageable pageable, @Param("bugId") Long bugId);
}
