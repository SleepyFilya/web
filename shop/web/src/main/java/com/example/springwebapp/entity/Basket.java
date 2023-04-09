package com.example.springwebapp.entity;

import javax.persistence.*;
import java.util.*;

public class Basket
{
    private Map<Product, Integer> productMap;

    public Basket()
    {
        productMap = new HashMap<>();
    }

    public Map<Product, Integer> getProductMap() { return productMap; }


    public void plusProductToMap(Product product)
    {
        if(productMap.containsKey(product))
            productMap.put(product, productMap.get(product) + 1);
        else
            productMap.put(product, 1);

        product.setCount(product.getCount() + 1);
    }

    public void minusProductFromMap(Product product)
    {
        product.setCount(product.getCount() - 1);
        productMap.put(product, productMap.get(product) - 1);
    }

    public void removeProductFromMap(Product product)
    {
        product.setCount(0);
        productMap.remove(product);
    }

    public void removeAllFromMap() { productMap.clear(); }

    public int countBasket()
    {
        int count = 0;

        for(Integer value : productMap.values())
            count += Integer.parseInt(value.toString());

        return count;
    }

    public String mapToString()
    {
        StringBuilder mapAsString = new StringBuilder("{");
        for (Product key : productMap.keySet())
        {
            mapAsString.append(key + "=" + productMap.get(key) + ";");
        }
        mapAsString.delete(mapAsString.length()-1, mapAsString.length()).append("}");

        return mapAsString.toString();
    }

    public int basketTotalCost()
    {
        int cost = 0;

        for(Product product : productMap.keySet())
            cost += product.getPrice() * Integer.parseInt(productMap.get(product).toString());

        return cost;
    }
}
