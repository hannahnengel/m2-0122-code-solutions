select "firstName",
        "lastName",
        sum("payments"."amount") as "total paid"
    from "customers"
    join "payments" using ("customerId")
  group by "customers"."customerId"
  order by "total paid" desc;
