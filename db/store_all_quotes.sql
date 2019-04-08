insert into swanson_quotes (quote, word_count, one_star, two_star, three_star, four_star, five_star) values ($1, $2, $3, $4, $5, $6, $7)
returning *;