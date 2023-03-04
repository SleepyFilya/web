package com.example.springwebapp.entity;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class Product
{
    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(length = 128, nullable = false)
    private String title;

    @Column(length = 256)
    private String description;

    @Column(nullable = false)
    private int price;

    public Product() {}

    public Product(Integer id, String title, String description, int price) {
        this.id = id;
        this.title = title;
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
