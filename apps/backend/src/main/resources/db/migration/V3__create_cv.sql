create table if not exists cv (
  id         bigserial primary key,
  user_id    bigint not null references app_user(id) on delete cascade,

  full_name  varchar(255) not null,
  email      varchar(255),
  phone      varchar(64),
  location   varchar(255),
  website    varchar(255),
  github     varchar(255),
  linkedin   varchar(255),

  summary    text,
  skills     text,
  experience text,
  projects   text,
  education  text
);

create unique index if not exists ux_cv_user on cv(user_id);