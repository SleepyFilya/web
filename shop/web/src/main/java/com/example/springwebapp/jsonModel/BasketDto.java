package com.example.springwebapp.jsonModel;

import com.example.springwebapp.entity.Product;
import org.json.simple.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class BasketDto
{

    public List<Product> getProducts() {
        return products;
    }

    private List<Product> products = new ArrayList<>();

    public int getGoodsCounter() {
        return goodsCounter;
    }

    private int goodsCounter = 0;

    public void setProduct(int id, String name, String image, String description, int price, int count)
    {
        products.add(new Product(id, name, image, description, price, count));
    }

    public void setGoodsCounter(int goodsCounter) {
        this.goodsCounter = goodsCounter;
    }
}
