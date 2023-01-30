package com.bugsolver.util;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class BugSearchCriteria {
    private String title;
    private Set<String> categories;
    private Long userId;

}
