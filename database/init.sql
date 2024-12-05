CREATE EXTENSION IF NOT EXISTS pgcrypto;

Drop table if exists cats;

CREATE TABLE IF NOT EXISTS cats (
    id SERIAL primary key,
    raze VARCHAR(100) not null,
    name VARCHAR(100) not null,
    birthdate VARCHAR(20) not null
);

insert into cats (raze, name, birthdate)
    values ('Siames', 'Mia', '2019-01-01'),
           ('Persa', 'Milo', '2018-02-02'),
           ('Sphynx', 'Mia', '2020-03-03'),
           ('Bengal', 'Milo', '2017-04-04');

