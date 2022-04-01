select "countries"."name" as "country",
        count("cities".*) as "city count"
  from "countries"
  join "cities" using ("countryId")
group by "countries"."countryId";
