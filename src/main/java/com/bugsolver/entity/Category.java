package com.bugsolver.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="Category")
public class Category {

    @Id
    private long id;
    private String name;

    @ManyToMany(mappedBy="categories", fetch = FetchType.LAZY)
    private Set<Bug> bugs = new HashSet<>();
}
