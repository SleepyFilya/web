package com.example.springwebapp.controller;
import java.util.*;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.springwebapp.entity.Product;

@Controller
public class Home {
    @GetMapping("/products")
    public String getAll(Model model, @RequestParam(required = false, name="keyword") String keyword,
                         @RequestParam(required = false, name="sort") String sort) {
        try {
            System.out.println(keyword);
            System.out.println(sort);
            List<Product> products = getProductsList();

            if(keyword != null && keyword != "")
                products = getFilteredList(products, keyword);
            if("SortByUpperPrice".equals(sort) || "SortByLowerPrice".equals(sort)) {
                System.out.println("ddddddd");
                products = getSortedByPriceList(products, sort);
            }

            model.addAttribute("products", products);
        } catch (Exception e) {
            model.addAttribute("message", e.getMessage());
        }

        return "index";
    }

    static ArrayList<Product> getProductsList() {
        ArrayList<Product> tutorialsList = new ArrayList<Product>();

        for (int i = 0; i < 10; i++) {
            Product curTut = new Product();

            String product = (i < 5) ? "Fish" : "Honey";

            curTut.setId(i + 1);
            curTut.setTitle(product + " basket #" + (i + 1));
            curTut.setDescription("Cool " + product + " basket");
            curTut.setPrice((10 - i) * 100);

            tutorialsList.add(curTut);
            System.out.println(curTut);
        }

        return tutorialsList;
    }

    //фильтрация
    static List<Product> getFilteredList(List<Product> tutorialsList, String keyword) {
        List<Product> filteredList = new ArrayList<Product>();

        for (Product product : tutorialsList) {
            if (product.getTitle().contains(keyword))
                filteredList.add(product);
        }

        return filteredList;
    }

    //сортировка
    static List<Product> getSortedByPriceList(List<Product> tutorialList, String keyword) {
        List<Product> sortedList = new ArrayList<Product>();

        System.out.println("jjjj: " + keyword);

        if (Objects.equals(keyword, new String("SortByUpperPrice"))) {
            Collections.sort(tutorialList, new Comparator<Product>() {
                @Override
                public int compare(Product o1, Product o2) {
                    System.out.println(o1.getPrice());
                    System.out.println(o2.getPrice());
                    return new Integer(o1.getPrice()).compareTo(o2.getPrice());
                }
            });

            for (Product entity : tutorialList) {
                System.out.println(entity);
            }
        } else if (Objects.equals(keyword, new String("SortByLowerPrice"))) {
            Collections.sort(tutorialList, new Comparator<Product>() {
                @Override
                public int compare(Product o1, Product o2) {
                    return new Integer(o1.getPrice()).compareTo(o2.getPrice());
                }
            });

            Collections.reverse(tutorialList);
        }

        return tutorialList;
    }
}





