package com.example.springwebapp.collection;

import com.example.springwebapp.entity.Basket;
import com.example.springwebapp.entity.Product;

import javax.servlet.http.HttpSession;
import java.util.*;

public class BasketsCollection
{
    private Map<HttpSession, Basket> basketMap;

    public BasketsCollection()
    {
        basketMap = new HashMap<>();
    };

    public Map<HttpSession, Basket> getBasketMap() { return basketMap; }

    public void addProductToBasket(HttpSession session, Product product)
    {
        if(!(basketMap.containsKey(session)))
            basketMap.put(session, new Basket());

        basketMap.get(session).addProductToMap(product);
    }

    public void removeProductFromBasket(HttpSession session, Product product)
    {
        basketMap.get(session).removeProductFromMap(product);
    }

    public int countProductsInBasket(HttpSession session)
    {
        return basketMap.get(session).countBasket();
    }
}
