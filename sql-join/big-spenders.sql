select "firstName",
        "lastName"
    from "customers"
    join "payments" using ("customerId")
  order by "payments"."amount" desc
  limit 10;
