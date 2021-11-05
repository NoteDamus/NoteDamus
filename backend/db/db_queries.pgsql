create table users(
  id serial primary key,
  email varchar(50) not null,
  name varchar(50) not null,
  surname varchar(50) not null,
  user_type integer not null,
  creation_date timestamp default NULL
);

create table folders(
  id serial primary key,
  user_id integer,
  title varchar(50) not null,
  creation_date timestamp default NULL
);

create table notes(
  id serial primary key,
  folder_id integer,
  content text not null,
  source_id integer,
  creation_date timestamp default NULL
);

create table images	(
  id serial primary key,
  folder_id integer,
  image_name varchar(100) not null,
  saved_name varchar(100) not null,
  creation_date timestamp default NULL
);


create table note_sources	(
  id serial primary key,
  note_id integer,
  source_type varchar(10) not null,
  source_address text not null
);
