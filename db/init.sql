create table if not exists swanson_quotes (
id serial primary key,
quote text,
word_count integer,
one_star integer,
two_star integer,
three_star integer,
four_star integer,
five_star integer
);

create table if not exists quote_raters (
id serial primary key,
quote_id integer,
user_ip_address text
);