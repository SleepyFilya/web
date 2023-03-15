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

    public void plusOneProductToBasket(HttpSession session, Product product)
    {
        if(!(basketMap.containsKey(session)))
            basketMap.put(session, new Basket());

        basketMap.get(session).plusProductToMap(product);
    }

    public void minusOneProductToBasket(HttpSession session, Product product)
    {
        basketMap.get(session).minusProductFromMap(product);
    }

    public void removeProductFromBasket(HttpSession session, Product product)
    {
        basketMap.get(session).removeProductFromMap(product);
    }

    public void removeAllFromBasket(HttpSession session)
    {
        basketMap.get(session).removeAllFromMap();
    }

    public int countProductsInBasket(HttpSession session)
    {
        if(basketMap.containsKey(session))
            return basketMap.get(session).countBasket();
        else
            return 0;
    }

    public int getBasketTotalCost(HttpSession session)
    {
        if(basketMap.containsKey(session))
            return basketMap.get(session).basketTotalCost();
        else
            return 0;
    }
}
