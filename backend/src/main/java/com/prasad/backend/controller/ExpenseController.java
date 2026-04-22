package com.prasad.backend.controller;

import com.prasad.backend.dto.CreateExpenseRequest;

import com.prasad.backend.dto.ExpenseResponse;

import com.prasad.backend.service.ExpenseService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {
    private final ExpenseService expenseService;
    
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ExpenseResponse  createExpense(@RequestBody CreateExpenseRequest request) {
        return expenseService.createExpense(request);

    }

    @GetMapping
    public List<ExpenseResponse> getExpenses(@RequestParam(required = false) String category,
                                            @RequestParam(required = false) String sort) {
        return expenseService.getExpenses(category, sort);
    }
}