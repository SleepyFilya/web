package com.example.springwebapp.entity;

import java.util.*;

public class Basket
{
    private Map<Product, Integer> productMap;

    private String location;

    private Calendar orderTime;

    public Basket()
    {
        productMap = new HashMap<>();
        location = "someCity";
        orderTime = new GregorianCalendar(2023, 3, 8);
    }

    public Map<Product, Integer> getProductMap() { return productMap; }


    public void addProductToMap(Product product)
    {
        if(productMap.containsKey(product))
            productMap.put(product, productMap.get(product) + 1);
        else
            productMap.put(product, 1);

        productMap.forEach((key, value) -> System.out.println("[Key] : " + key + " [Value] : " + value));
    }

    public void removeProductFromMap(Product product) { productMap.remove(product); }

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location; }

    public Calendar getOrderTime() { return orderTime; }

    public void setOrderTime(Calendar orderTime) { this.orderTime = orderTime; }


    public int countBasket()
    {
        int count = 0;

        for(Integer value : productMap.values())
            count += Integer.parseInt(value.toString());

        return count;
    }
}
