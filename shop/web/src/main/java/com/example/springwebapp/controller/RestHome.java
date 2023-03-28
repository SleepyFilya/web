package com.example.springwebapp.controller;

import com.example.springwebapp.collection.BasketsCollection;
import com.example.springwebapp.collection.ProductsCollection;
import com.example.springwebapp.entity.Basket;
import com.example.springwebapp.entity.Product;
import com.example.springwebapp.model.OrderModel;
import com.example.springwebapp.repository.OrderRepository;
import org.json.simple.JSONObject;
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

    @GetMapping("/products")
    public JSONObject getAll(Model model, HttpSession session,
                         @RequestParam(required = false, name="keyword") String keyword,
                         @RequestParam(required = false, name="sort") String sort)
    {
        List<Product> products = productsCollection.getProducts();

        if(keyword != null && keyword != "")
            products = productsCollection.getFilteredList(keyword);
        if("SortByUpperPrice".equals(sort) || "SortByLowerPrice".equals(sort))
            products = productsCollection.getSortedByPriceList(products, sort);

        String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(session));

//        model.addAttribute("products", products);
//        model.addAttribute("goodsCounter", goodsCounter);

        JSONObject result = new JSONObject();

        for(Product product : products)
        {
            JSONObject tmp = new JSONObject();
            tmp.put("name", product.getTitle());
            tmp.put("image", product.getImageLink());
            tmp.put("description", product.getDescription());
            tmp.put("price", product.getPrice());

            result.put("product_"+product.getId(), tmp);
        }

        //что делать с счетиком товаров?

        return result;
    }

    @GetMapping("/basket")
    public JSONObject getBasket(Model model, HttpSession session)
    {
//        basketsCollection.plusOneProductToBasket(session, productsCollection.getProductMap().get(Integer.parseInt("1")));
//        basketsCollection.plusOneProductToBasket(session, productsCollection.getProductMap().get(Integer.parseInt("1")));

        Map<Product, Integer> productsMap = basketsCollection.getBasketMap().get(session).getProductMap();
        List<Product> products = new ArrayList<>(productsMap.keySet());
        List<Integer> productCounts = new ArrayList<>(productsMap.values());

        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

//        model.addAttribute("totalCost", totalCost);
//        model.addAttribute("products", products);
//        model.addAttribute("counts", productCounts);

        JSONObject result = new JSONObject();

        for(Product product : products)
        {
            JSONObject tmp = new JSONObject();
            tmp.put("name", product.getTitle());
            tmp.put("image", product.getImageLink());
            tmp.put("description", product.getDescription());
            tmp.put("price", product.getPrice());
            tmp.put("count", productCounts.get(products.indexOf(product)));

            result.put("product_"+product.getId(), tmp);
        }

        //как отправлять totalCost? отдельный метод или забросить в json, а там  уже распарсится?

        return result;
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
//        String data = goodsCounter + " " + totalCost;
//        model.addAttribute("array", data);

        JSONObject result = new JSONObject();
        result.put("totalCost", totalCost);
        result.put("goodsCounter", goodsCounter);

        return result;
    }

    @RequestMapping("/remove_from_basket")
    public JSONObject removeFromBasket(Model model, HttpSession session,
                                   @RequestParam(name="product_id") String product_id)
    {
        basketsCollection.removeProductFromBasket(session, productsCollection.getProductMap().get(Integer.parseInt(product_id)));

        Map<Product, Integer> productsMap = basketsCollection.getBasketMap().get(session).getProductMap();
        List<Product> products = new ArrayList<>(productsMap.keySet());
        List<Integer> productCounts = new ArrayList<>(productsMap.values());

        String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(session));

        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

//        model.addAttribute("totalCost", totalCost);
//        model.addAttribute("products", products);
//        model.addAttribute("counts", productCounts);
//        model.addAttribute("goodsCounter", goodsCounter);

        JSONObject result = new JSONObject();

        for(Product product : products)
        {
            JSONObject tmp = new JSONObject();
            tmp.put("name", product.getTitle());
            tmp.put("image", product.getImageLink());
            tmp.put("description", product.getDescription());
            tmp.put("price", product.getPrice());
            tmp.put("count", productCounts.get(products.indexOf(product)));

            result.put("product_"+product.getId(), tmp);
        }

        //как отправлять totalCost и счетчик товаров? отдельный метод или забросить в json, а там  уже распарсится?

        return result;
    }

    @GetMapping("/create_order")
    public JSONObject createOrderFromBasket(Model model, HttpSession session,
                                        @CookieValue(value = "location", required = false) Cookie location)
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

//        model.addAttribute("totalCost", totalCost);
//        model.addAttribute("products", products);

        JSONObject result = new JSONObject();

        //как отправлять totalCost? отдельный метод или забросить в json, а там  уже распарсится?

        return result;
    }

    @RequestMapping("/get_total_cost")
    @ResponseBody
    public JSONObject basketTotalCost(Model model, HttpSession session)
    {
        String totalCost = Integer.toString(basketsCollection.getBasketTotalCost(session));

//        model.addAttribute("array", totalCost);

        JSONObject result = new JSONObject();
        result.put("totalCost", totalCost);

        return result;
    }
}
