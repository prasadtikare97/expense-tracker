package com.prasad.backend.entity;  
import jakarta.persistence.Entity;

import jakarta.persistence.Id;

import jakarta.persistence.PrePersist;

import jakarta.persistence.Table;

import java.math.BigDecimal;

import java.time.LocalDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    private String id;

    private String category;
    private BigDecimal amount;
    private String description;
    private LocalDate date;
    private LocalDate createdAt;

    public Expense() {
    
    }
    public Expense(String id,String category, BigDecimal amount, String description, LocalDate date) {
        this.id = id;
        this.category = category;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.createdAt = LocalDate.now();
    }

    @PrePersist
    protected void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDate.now();
        }
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public BigDecimal getAmount() {
        return amount;
    }
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }   
    public LocalDate getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

}