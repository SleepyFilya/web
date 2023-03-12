package com.example.springwebapp.model;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

@Entity
@Table(name = "baskets")
public class BasketModel
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer basketId;

    @Column(name = "session", length = 100, nullable = false)
    private String session;

    @Column(name = "order", length = 1000, nullable = false)
    private String orderList;

    @Column(name = "date", length = 20, nullable = false)
    private Date orderTime;

    @Column(name = "location", length = 30, nullable = false)
    private String location;

    public BasketModel() { }

    public Integer getBasketId() {
        return basketId;
    }

    public BasketModel(/*Integer basketId,*/ String session, String orderList, Date orderTime, String location)
    {
//        this.basketId = basketId;
        this.session = session;
        this.orderList = orderList;
        this.orderTime = orderTime;
        this.location = location;
    }
}
