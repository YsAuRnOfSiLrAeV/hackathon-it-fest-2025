create table app_user (
  id           bigserial primary key,
  provider     varchar(32)  not null,
  provider_id  varchar(128) not null,
  email        varchar(255),
  name         varchar(255),
  created_at   timestamp not null default now(),
  updated_at   timestamp not null default now()
);

create unique index ux_app_user_provider_pid
  on app_user(provider, provider_id);

create unique index if not exists ux_app_user_email
  on app_user(email)
  where email is not null;
