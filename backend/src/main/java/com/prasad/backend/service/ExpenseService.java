package com.prasad.backend.service;

import com.prasad.backend.dto.CreateExpenseRequest;
import com.prasad.backend.dto.ExpenseResponse;
import com.prasad.backend.entity.Expense;
import com.prasad.backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public ExpenseResponse createExpense(CreateExpenseRequest request) {
        String expenseId = (request.getId() != null && !request.getId().isBlank())
                ? request.getId()
                : UUID.randomUUID().toString();

        Expense existingExpense = expenseRepository.findById(expenseId).orElse(null);
        if (existingExpense != null) {
            return toResponse(existingExpense);
        }

        Expense expense = new Expense();
        expense.setId(expenseId);
                expense.setCategory(request.getCategory());
        expense.setAmount(request.getAmount());

        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());

        Expense savedExpense = expenseRepository.save(expense);
        return toResponse(savedExpense);
    }

    public List<ExpenseResponse> getExpenses(String category, String sort) {
        List<Expense> expenses;

        if (category != null && !category.isBlank()) {
            expenses = expenseRepository.findByCategoryIgnoreCaseOrderByDateDescCreatedAtDesc(category);
        } else {
            expenses = expenseRepository.findAllByOrderByDateDescCreatedAtDesc();
        }

        return expenses.stream()
                .map(this::toResponse)
                .toList();
    }

    private ExpenseResponse toResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getCategory(),
                expense.getAmount(),
                
                expense.getDescription(),
                expense.getDate(),
                expense.getCreatedAt()
        );
    }
}