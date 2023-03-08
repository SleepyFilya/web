package com.example.springwebapp.collection;
import com.example.springwebapp.entity.Product;

import java.util.*;

public class ProductCollection
{
    private Map<Integer, Product> productMap;

    public ProductCollection()
    {
        productMap = new HashMap<>();

        productMap.put(1, new Product(1, "Fish basket #1", "Cool fish basket", 1000));
        productMap.put(2, new Product(2, "Fish basket #2", "Cool fish basket", 900));
        productMap.put(3, new Product(3, "Fish basket #3", "Cool fish basket", 800));
        productMap.put(4, new Product(4, "Fish basket #4", "Cool fish basket", 700));
        productMap.put(5, new Product(5, "Fish basket #5", "Cool fish basket", 600));
        productMap.put(6, new Product(6, "Honey basket #6", "Cool honey basket", 500));
        productMap.put(7, new Product(7, "Honey basket #7", "Cool honey basket", 400));
        productMap.put(8, new Product(8, "Honey basket #8", "Cool honey basket", 300));
        productMap.put(9, new Product(9, "Honey basket #9", "Cool honey basket", 200));
        productMap.put(10, new Product(10, "Honey basket #10", "Cool honey basket", 100));
    };

    public Map<Integer, Product> getProductMap() { return productMap; }

    public List<Product> getProducts()
    {
        List<Product> products = new ArrayList<>();

        for(Product product : productMap.values())
            products.add(product);

        return products;
    }

    public List<Product> getFilteredList(String keyword)
    {
        List<Product> filteredList = new ArrayList<>();

        for (Product product : productMap.values())
        {
            if (product.getTitle().contains(keyword))
                filteredList.add(product);
        }

        return filteredList;
    }

    public List<Product> getSortedByPriceList(List<Product> productList, String keyword)
    {
        Collections.sort(productList, new Comparator<>()
        {
            @Override
            public int compare(Product o1, Product o2)
            {
                return new Integer(o1.getPrice()).compareTo(o2.getPrice());
            }
        });

        if(Objects.equals(keyword, "SortByLowerPrice"))
            Collections.reverse(productList);

        return productList;
    }


}
