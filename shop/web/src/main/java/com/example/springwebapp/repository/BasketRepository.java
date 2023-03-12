package com.example.springwebapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springwebapp.model.BasketModel;

public interface BasketRepository extends JpaRepository<BasketModel, Integer>
{
}
