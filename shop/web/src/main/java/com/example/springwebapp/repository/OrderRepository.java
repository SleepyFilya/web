package com.example.springwebapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springwebapp.model.OrderModel;

public interface OrderRepository extends JpaRepository<OrderModel, Integer>
{
}
