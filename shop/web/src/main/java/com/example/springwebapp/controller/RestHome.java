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
    private boolean basketFlag = false;
    private boolean sessionFlag = false;
    private HttpSession mainSession;

    @GetMapping("/products")
    public BasketDto getAll(Model model, HttpSession session,
                         @RequestParam(required = false, name="keyword") String keyword,
                         @RequestParam(required = false, name="sort") String sort)
    {
        if(!sessionFlag) {
            mainSession = session;
            sessionFlag = true;
        }

        List<Product> products = productsCollection.getProducts();

        if(keyword != null && keyword != "")
            products = productsCollection.getFilteredList(keyword);
        if("SortByUpperPrice".equals(sort) || "SortByLowerPrice".equals(sort))
            products = productsCollection.getSortedByPriceList(products, sort);

//        int goodsCounter = basketsCollection.countProductsInBasket(session);
        int goodsCounter = basketsCollection.countProductsInBasket(mainSession);

        BasketDto data = new BasketDto();

        for(Product product : products)
            data.setProduct(product.getId(), product.getTitle(), product.getImageLink(), product.getDescription(), product.getPrice(), product.getCount());
        data.setGoodsCounter(goodsCounter);

        return data;
    }

    @GetMapping("/basket")
    public BasketDto getBasket(Model model, HttpSession session) {

        Map<Product, Integer> productsMap;
        if(basketFlag) {
            productsMap = basketsCollection.getBasketMap().get(mainSession).getProductMap();
        }
        else {
            productsMap = new HashMap<>();
        }

        List<Product> products = new ArrayList<>(productsMap.keySet());

//        int goodsCounter = basketsCollection.countProductsInBasket(session);
        int goodsCounter = basketsCollection.countProductsInBasket(mainSession);

        BasketDto data = convertToDto(products, goodsCounter);

        return data;
    }

    @RequestMapping("/change_basket")
    @ResponseBody
    public JSONObject basketCounterChange(Model model, HttpSession session,
                                      @RequestParam(name="product_id") String product_id,
                                      @RequestParam(name="action") String action)
    {
        System.out.println("basketCounterChange: " + mainSession);

        if("1".equals(action)) {
            basketFlag = true;
//            basketsCollection.plusOneProductToBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));
            basketsCollection.plusOneProductToBasket(mainSession, productsCollection.getProductMap().get(Integer.parseInt(product_id)));
        }
        if("0".equals(action))
//            basketsCollection.minusOneProductToBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));
            basketsCollection.minusOneProductToBasket(mainSession, productsCollection.getProductMap().get(Integer.parseInt(product_id)));

//        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));
        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(mainSession));

//        String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(session));
        String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(mainSession));
        JSONObject data = new JSONObject();
        data.put("totalCost", totalCost);
        data.put("goodsCounter", goodsCounter);

        return data;
    }

    @RequestMapping("/remove_from_basket")
    public BasketDto removeFromBasket(Model model, HttpSession session,
                                   @RequestParam(name="product_id") String product_id)
    {
//        basketsCollection.removeProductFromBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));
        basketsCollection.removeProductFromBasket(mainSession, productsCollection.getProductMap().get(Integer.parseInt(product_id)));

//        Map<Product, Integer> productsMap = basketsCollection.getBasketMap().get(session).getProductMap();
        Map<Product, Integer> productsMap = basketsCollection.getBasketMap().get(mainSession).getProductMap();
        List<Product> products = new ArrayList<>(productsMap.keySet());

//        int goodsCounter = basketsCollection.countProductsInBasket(session);
        int goodsCounter = basketsCollection.countProductsInBasket(mainSession);

        BasketDto data = convertToDto(products, goodsCounter);

        return data;
    }

    @GetMapping("/create_order")
    public BasketDto createOrderFromBasket(Model model, HttpSession session,
//                                        @CookieValue(value = "location", required = false) Cookie location)
                                           @RequestParam(name="local") String location)

    {
        System.out.println(location);
//        Basket currentBasket = basketsCollection.getBasketMap().get(session);
        Basket currentBasket = basketsCollection.getBasketMap().get(mainSession);
//        OrderModel basketEntry = new OrderModel(session.toString(),
//                currentBasket.mapToString(),
//                Date.from(Instant.now()), location.getValue());
        OrderModel basketEntry = new OrderModel(mainSession.toString(),
                currentBasket.mapToString(),
                Date.from(Instant.now()), location);

        orderRepository.save(basketEntry);

//        basketsCollection.removeAllFromBasket(session);
        basketsCollection.removeAllFromBasket(mainSession);
        List<Product> products = new ArrayList<>();

//        int goodsCounter = basketsCollection.countProductsInBasket(session);
        int goodsCounter = basketsCollection.countProductsInBasket(mainSession);

        BasketDto data = convertToDto(products, goodsCounter);

        return data;
    }

    @RequestMapping("/get_total_cost")
    @ResponseBody
    public JSONObject basketTotalCost(Model model, HttpSession session)
    {
//        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));
        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(mainSession));

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
