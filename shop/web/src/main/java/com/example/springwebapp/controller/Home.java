package com.example.springwebapp.controller;
import java.util.*;

import com.example.springwebapp.collection.BasketsCollection;
import com.example.springwebapp.collection.ProductCollection;
import com.example.springwebapp.entity.Basket;
import com.fasterxml.jackson.databind.util.TypeKey;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.springwebapp.entity.Product;

import javax.servlet.http.HttpSession;

@Controller
public class Home
{
    private BasketsCollection basketsCollection = new BasketsCollection();
    private ProductCollection productCollection = new ProductCollection();

    @GetMapping("/products")
    public String getAll(Model model,
                         @RequestParam(required = false, name="keyword") String keyword,
                         @RequestParam(required = false, name="sort") String sort)
    {
        try {
            List<Product> products = productCollection.getProducts();

            if(keyword != null && keyword != "")
                products = productCollection.getFilteredList(keyword);
            if("SortByUpperPrice".equals(sort) || "SortByLowerPrice".equals(sort))
                products = productCollection.getSortedByPriceList(products, sort);

            model.addAttribute("products", products);
        } catch (Exception e) {
            model.addAttribute("message", e.getMessage());
        }

        return "index";
    }

//    static ArrayList<Product> getProductsList() {
//        ArrayList<Product> tutorialsList = new ArrayList<Product>();
//
//        for (int i = 0; i < 10; i++) {
//            Product curTut = new Product();
//
//            String product = (i < 5) ? "Fish" : "Honey";
//
//            curTut.setId(i + 1);
//            curTut.setTitle(product + " basket #" + (i + 1));
//            curTut.setDescription("Cool " + product + " basket");
//            curTut.setPrice((10 - i) * 100);
//
//            tutorialsList.add(curTut);
//            System.out.println(curTut);
//        }
//
//        return tutorialsList;
//    }

    //фильтрация
//    static List<Product> getFilteredList(List<Product> tutorialsList, String keyword) {
//        List<Product> filteredList = new ArrayList<Product>();
//
//        for (Product product : tutorialsList) {
//            if (product.getTitle().contains(keyword))
//                filteredList.add(product);
//        }
//
//        return filteredList;
//    }

    //сортировка
//    static List<Product> getSortedByPriceList(List<Product> tutorialList, String keyword) {
//        List<Product> sortedList = new ArrayList<>();
//
//        if (Objects.equals(keyword, new String("SortByUpperPrice"))) {
//            Collections.sort(tutorialList, new Comparator<Product>() {
//                @Override
//                public int compare(Product o1, Product o2) {
//                    System.out.println(o1.getPrice());
//                    System.out.println(o2.getPrice());
//                    return new Integer(o1.getPrice()).compareTo(o2.getPrice());
//                }
//            });
//
//            for (Product entity : tutorialList) {
//                System.out.println(entity);
//            }
//        } else if (Objects.equals(keyword, new String("SortByLowerPrice"))) {
//            Collections.sort(tutorialList, new Comparator<Product>() {
//                @Override
//                public int compare(Product o1, Product o2) {
//                    return new Integer(o1.getPrice()).compareTo(o2.getPrice());
//                }
//            });
//
//            Collections.reverse(tutorialList);
//        }
//
//        return tutorialList;
//    }

    @GetMapping("/basket")
    public String getBasket(Model model, HttpSession session)
    {
        try {
            Map<Product, Integer> productsMap = basketsCollection.getBasketMap().get(session).getProductMap();
            List<Product> products = new ArrayList<>(productsMap.keySet());
            List<Integer> productCounts = new ArrayList<>(productsMap.values());

//            List<Product> products = productCollection.getProducts();

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
        basketsCollection.addProductToBasket(session, productCollection.getProductMap().get(Integer.parseInt(product_id)));
        String goodsCounter = Integer.toString(basketsCollection.countProductsInBasket(session));
        model.addAttribute("goodsCounter", goodsCounter);
        return goodsCounter;
    }
}





