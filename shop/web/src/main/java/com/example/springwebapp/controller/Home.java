package com.example.springwebapp.controller;
import java.util.*;

import com.example.springwebapp.collection.BasketsCollection;
import com.example.springwebapp.collection.ProductsCollection;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.springwebapp.entity.Product;

import javax.servlet.http.HttpSession;

@Controller
public class Home
{
    private BasketsCollection basketsCollection = new BasketsCollection();
    private ProductsCollection productsCollection = new ProductsCollection();

    @GetMapping("/products")
    public String getAll(Model model, HttpSession session,
                         @RequestParam(required = false, name="keyword") String keyword,
                         @RequestParam(required = false, name="sort") String sort)
    {
        try {
            List<Product> products = productsCollection.getProducts();

            if(keyword != null && keyword != "")
                products = productsCollection.getFilteredList(keyword);
            if("SortByUpperPrice".equals(sort) || "SortByLowerPrice".equals(sort))
                products = productsCollection.getSortedByPriceList(products, sort);

            model.addAttribute("products", products);
        } catch (Exception e) {
            model.addAttribute("message", e.getMessage());
        }

        return "index";
    }

    @GetMapping("/basket")
    public String getBasket(Model model, HttpSession session)
    {
        try {
            Map<Product, Integer> productsMap = basketsCollection.getBasketMap().get(session).getProductMap();
            List<Product> products = new ArrayList<>(productsMap.keySet());
            List<Integer> productCounts = new ArrayList<>(productsMap.values());

            model.addAttribute("products", products);
            model.addAttribute("counts", productCounts);
        } catch (Exception e) {
            model.addAttribute("message", e.getMessage());
        }

        return "basket";
    }

    @RequestMapping("/add_to_basket")
    @ResponseBody
    public String cartCounterChange(Model model, HttpSession session,
                                    @RequestParam(name="product_id") String product_id)
    {
        basketsCollection.addProductToBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));
        String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(session));
        model.addAttribute("goodsCounter", goodsCounter);
        return goodsCounter;
    }

}





