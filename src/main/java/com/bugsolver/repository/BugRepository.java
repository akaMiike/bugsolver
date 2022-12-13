package com.bugsolver.repository;

import com.bugsolver.entity.Bug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BugRepository extends JpaRepository<Bug, Long> {
}
