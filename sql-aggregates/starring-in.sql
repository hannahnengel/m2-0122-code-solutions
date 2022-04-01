select "genres"."name" as "genre",
        count("filmGenre".*)
    from "genres"
    join "filmGenre" using ("genreId")
    join "castMembers" using ("filmId")
  where "castMembers"."actorId" = '178'
  group by "genres"."name";
