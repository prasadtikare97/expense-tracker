package com.prasad.backend.repository;

import com.prasad.backend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ExpenseRepository extends JpaRepository<Expense, String> {
    List<Expense> findByCategoryIgnoreCaseOrderByDateDescCreatedAtDesc(String category);
    List<Expense> findAllByOrderByDateDescCreatedAtDesc();
}