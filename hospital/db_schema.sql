create type "appointment_status" as enum ('not_derivated', 'assigned', 'finished');
create type "specialization_type" as enum (
  'cardiology'
);
create type "role_type" as enum ('admin', 'doctor', 'patient');
create type "medicine_type" as enum ('apixaban');
create table  "Users" (
  id serial primary key,
  name varchar(255),
  password varchar(255),
  role role_type,
  token_validator varchar(255),
  created_at timestamp
);
create table  "Admins" (
  id serial primary key,
  user_id integer,
  foreign key (user_id) references "Users" (id)
);
create table  "Doctors" (
  id serial primary key,
  user_id integer,
  specialization specialization_type,
  foreign key (user_id) references "Users" (id)
);
create table  "Patients" (
  id serial primary key,
  user_id integer,
  email varchar(255),
  phone varchar(255),
  foreign key (user_id) references "Users" (id)
);
create table  "Appointments" (
  id serial primary key,
  doctor_id integer,
  patient_id integer,
  duration_min integer,
  date timestamp(0),
  status appointment_status,
  created_at timestamp,
  foreign key (doctor_id) references "Doctors" (id),
  foreign key (patient_id) references "Patients" (id)
);

create table  "Derivations" (
  id serial primary key,
  appointment_id integer,
  admin_id integer,
  symptoms varchar(255),
  foreign key (appointment_id) references "Appointments" (id),
  foreign key (admin_id) references "Admins" (id)
);

create table "Prescriptions" (
  id serial primary key,
  appointment_id integer,
  patient_id integer,
  info text,
  medicine medicine_type,
  foreign key (appointment_id) references "Appointments" (id),
  foreign key (patient_id) references "Patients" (id)
);