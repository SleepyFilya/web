package com.example.springwebapp.entity;

import javax.persistence.*;

public class Product
{
    private Integer id;

    private String title;

    private String imageLink;

    private String description;

    private int price;

    public Product() {}

    public Product(Integer id, String title, String imageLink, String description, int price) {
        this.id = id;
        this.title = title;
        this.imageLink = imageLink;
        this.description = description;
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageLink() { return imageLink; }

    public void setImageLink(String imageLink) { this.imageLink = imageLink; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() { return price; }

    public void setPrice(int price) { this.price = price; }

    @Override
    public String toString() {
        return "Products [id=" + id + ", title=" + title + ", description=" + description + ", price=" + price + "]";
    }
}
