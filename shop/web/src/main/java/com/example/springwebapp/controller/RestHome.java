package com.example.springwebapp.controller;

import com.example.springwebapp.collection.BasketsCollection;
import com.example.springwebapp.collection.ProductsCollection;
import com.example.springwebapp.entity.Basket;
import com.example.springwebapp.entity.Product;
import com.example.springwebapp.jsonModel.BasketDto;
import com.example.springwebapp.model.OrderModel;
import com.example.springwebapp.repository.OrderRepository;
import org.json.simple.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.*;
import java.time.Instant;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RestHome {

    @Autowired
    OrderRepository orderRepository;

    private BasketsCollection basketsCollection = new BasketsCollection();
    private ProductsCollection productsCollection = new ProductsCollection();
    private ModelMapper modelMapper;

    @GetMapping("/products")
    public BasketDto getAll(Model model, HttpSession session,
                         @RequestParam(required = false, name="keyword") String keyword,
                         @RequestParam(required = false, name="sort") String sort)
    {

        List<Product> products = productsCollection.getProducts();

        if(keyword != null && keyword != "")
            products = productsCollection.getFilteredList(keyword);
        if("SortByUpperPrice".equals(sort) || "SortByLowerPrice".equals(sort))
            products = productsCollection.getSortedByPriceList(products, sort);

        int goodsCounter = basketsCollection.countProductsInBasket(session);

        BasketDto data = new BasketDto();

        for(Product product : products)
            data.setProduct(product.getId(), product.getTitle(), product.getImageLink(), product.getDescription(), product.getPrice(), product.getCount());
        data.setGoodsCounter(goodsCounter);

        return data;
    }

    @GetMapping("/basket")
    public BasketDto getBasket(Model model, HttpSession session) {
        Map<Product, Integer> productsMap = basketsCollection.getBasketMap().get(session).getProductMap();
        List<Product> products = new ArrayList<>(productsMap.keySet());

        int goodsCounter = basketsCollection.countProductsInBasket(session);

        BasketDto data = convertToDto(products, goodsCounter);

        return data;
    }

    @RequestMapping("/change_basket")
    @ResponseBody
    public JSONObject basketCounterChange(Model model, HttpSession session,
                                      @RequestParam(name="product_id") String product_id,
                                      @RequestParam(name="action") String action)
    {
        if("1".equals(action))
            basketsCollection.plusOneProductToBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));
        if("0".equals(action))
            basketsCollection.minusOneProductToBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));

        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

        String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(session));
        JSONObject data = new JSONObject();
        data.put("totalCost", totalCost);
        data.put("goodsCounter", goodsCounter);

        return data;
    }

    @RequestMapping("/remove_from_basket")
    public BasketDto removeFromBasket(Model model, HttpSession session,
                                   @RequestParam(name="product_id") String product_id)
    {
        basketsCollection.removeProductFromBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));

        Map<Product, Integer> productsMap = basketsCollection.getBasketMap().get(session).getProductMap();
        List<Product> products = new ArrayList<>(productsMap.keySet());
        List<Integer> productCounts = new ArrayList<>(productsMap.values());

        int goodsCounter = basketsCollection.countProductsInBasket(session);

        BasketDto data = convertToDto(products, goodsCounter);

        return data;
    }

    @GetMapping("/create_order")
    public BasketDto createOrderFromBasket(Model model, HttpSession session,
                                        @CookieValue(value = "location", required = false) Cookie location)
    {
        Basket currentBasket = basketsCollection.getBasketMap().get(session);
        OrderModel basketEntry = new OrderModel(session.toString(),
                currentBasket.mapToString(),
                Date.from(Instant.now()), location.getValue());

        orderRepository.save(basketEntry);

        basketsCollection.removeAllFromBasket(session);
        List<Product> products = new ArrayList<>();

        int goodsCounter = basketsCollection.countProductsInBasket(session);

        BasketDto data = convertToDto(products, goodsCounter);

        return data;
    }

    @RequestMapping("/get_total_cost")
    @ResponseBody
    public JSONObject basketTotalCost(Model model, HttpSession session)
    {
        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

        JSONObject data = new JSONObject();
        data.put("totalCost", totalCost);

        return data;
    }

    private BasketDto convertToDto(List<Product> products, int goodsCounter)
    {
        BasketDto data = new BasketDto();

        for(Product product : products)
            data.setProduct(product.getId(), product.getTitle(), product.getImageLink(), product.getDescription(), product.getPrice(), product.getCount());
        data.setGoodsCounter(goodsCounter);

        return data;
    }
}
