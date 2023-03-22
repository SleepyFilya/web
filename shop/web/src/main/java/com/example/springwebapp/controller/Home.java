package com.example.springwebapp.controller;
import java.time.Instant;
import java.util.*;

import com.example.springwebapp.entity.Basket;
import com.example.springwebapp.model.OrderModel;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.springwebapp.collection.BasketsCollection;
import com.example.springwebapp.collection.ProductsCollection;
import com.example.springwebapp.repository.OrderRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.springwebapp.entity.Product;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;

@Controller
public class Home
{
    @Autowired
    OrderRepository orderRepository;

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

            String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(session));

            model.addAttribute("products", products);
            model.addAttribute("goodsCounter", goodsCounter);
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

            String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

            model.addAttribute("totalCost", totalCost);
            model.addAttribute("products", products);
            model.addAttribute("counts", productCounts);
        } catch (Exception e) {
            model.addAttribute("message", e.getMessage());
        }

        return "basket";
    }

    @RequestMapping("/change_basket")
    @ResponseBody
    public String basketCounterChange(Model model, HttpSession session,
                                      @RequestParam(name="product_id") String product_id,
                                      @RequestParam(name="action") String action)
    {
        if("1".equals(action))
            basketsCollection.plusOneProductToBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));
        if("0".equals(action))
            basketsCollection.minusOneProductToBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));

        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

        String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(session));
        String data = goodsCounter + " " + totalCost;

        model.addAttribute("array", data);

        return data;
    }

    @RequestMapping("/remove_from_basket")
    public String removeFromBasket(Model model, HttpSession session,
                                      @RequestParam(name="product_id") String product_id)
    {
        try {
            basketsCollection.removeProductFromBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));

            Map<Product, Integer> productsMap = basketsCollection.getBasketMap().get(session).getProductMap();
            List<Product> products = new ArrayList<>(productsMap.keySet());
            List<Integer> productCounts = new ArrayList<>(productsMap.values());

            String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(session));

            String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

            model.addAttribute("totalCost", totalCost);
            model.addAttribute("products", products);
            model.addAttribute("counts", productCounts);
            model.addAttribute("goodsCounter", goodsCounter);

        } catch (Exception e) {
            model.addAttribute("message", e.getMessage());
        }

        return "basket";
    }

    @GetMapping("/create_order")
    public String createOrderFromBasket(Model model, HttpSession session,
                                        @CookieValue(value = "location", required = false) Cookie location)
    {
        try
        {
            Basket currentBasket = basketsCollection.getBasketMap().get(session);
            OrderModel basketEntry = new OrderModel(session.toString(),
                                                      currentBasket.mapToString(),
                                                      Date.from(Instant.now()), location.getValue());

            orderRepository.save(basketEntry);

            //очистка корзины и отправка пустой таблицы в html
            basketsCollection.removeAllFromBasket(session);
            List<Product> products = new ArrayList<>();

            String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

            model.addAttribute("totalCost", totalCost);
            model.addAttribute("products", products);
        }
        catch (Exception e)
        {
            model.addAttribute("message", e.getMessage());
        }

        return "basket";
    }

    @RequestMapping("/get_total_cost")
    @ResponseBody
    public String basketTotalCost(Model model, HttpSession session)
    {
        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

        model.addAttribute("array", totalCost);

        return totalCost;
    }
}





